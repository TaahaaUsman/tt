import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FloatingInputField from "../FormsFields/FloatingInputField";
import CustomButton from "../customButton/CustomButton";
import SwitchField from "../FormsFields/SwitchField";
import { ArrowLeft, ArrowRight } from "../../assets/Svgs/Svgs";
import { useDispatch, useSelector } from "react-redux";
import { createUser, updateUser } from "../../redux/features/userManagementSlice";
import { fetchCompanies } from "../../redux/features/newsAndFeaturesSlice";
import { toast } from "react-hot-toast";
import Loader from '../Loader/Loader'

import { useNavigate } from "react-router-dom";

const UserInformationForm = ({ ActiveTab, userData, isUpdateMode, userId }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { companies, loading: companiesLoading, error: companiesError } = useSelector((state) => state.news || []);

  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  const usPhoneRegex =
    /^(\+1\s?)?(\([2-9][0-9]{2}\)|[2-9][0-9]{2})[\s.-]?[0-9]{3}[\s.-]?[0-9]{4}$/;

  const validationSchema = Yup.object({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    // medical_firm: Yup.string().required("Medical firm is required"),
    phone: Yup.string()
      .matches(usPhoneRegex, "Enter valid phone number (e.g., (123) 456-7890)")
      .nullable(),
    fax: Yup.string().nullable(),
    office_hours: Yup.number()
      .typeError("Office hours must be a number")
      .nullable(),
    email: Yup.string().email("Invalid email address").nullable(),
    url: Yup.string().url("Invalid website URL").nullable(),
  });

  const formik = useFormik({
    initialValues: {
      firstName: userData?.first_name || "",
      lastName: userData?.last_name || "",
      medical_firm: userData?.medicalFirm || "",
      phone: userData?.phone || "",
      fax: userData?.fax || "",
      office_hours: userData?.officeHours || "",
      email: userData?.email || "",
      url: userData?.website || "",
      full_access: userData?.fullAccess || false,
      active: userData?.active || false,
      companies: companies?.map((company) => {
        const userCompany = userData?.companies?.find(
          (uc) => uc.companyId === company.id
        );
        return {
          id: company.id,
          company: company.name,
          contactWithMessages: userCompany?.contactWithMessages || false,
          title: userCompany?.title || "",
          selected: !!userCompany,
        };
      }) || [],
    },
    validationSchema,
    onSubmit: async (values) => {
      const payload = {
        userInfo: {
          first_name: values.firstName,
          last_name: values.lastName,
          medical_firm: values.medical_firm,
          phone: values.phone,
          fax: values.fax,
          office_hours: values.office_hours,
          email: values.email,
          url: values.url,
          full_access: values.full_access,
          active: values.active,
        },
        companies: values.companies.map((c) => ({
          company: c.company,
          contactWithMessages: c.contactWithMessages,
          title: c.title,
          selected: c.selected,
        })),
      };
      setNewUserData({
        ...payload.userInfo,
        companies: payload.companies,
      });


      try {
        ActiveTab("userName_password", { userInfo: payload.userInfo, companies: payload.companies });
      } catch (error) {
        toast.error(error.message || "An error occurred.");
      }
    },
  });

  // Pagination logic for companies table
  const [entriesPerPage, setEntriesPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = Math.ceil(formik.values.companies.length / entriesPerPage);
  const paginatedData = formik.values.companies.slice(
    (currentPage - 1) * entriesPerPage,
    currentPage * entriesPerPage
  );

  const getPageNumbers = () => {
    const pageNumbers = [];
    const maxVisible = 4;
    if (totalPages <= maxVisible) {
      for (let i = 1; i <= totalPages; i++) pageNumbers.push(i);
    } else {
      if (currentPage <= 3) pageNumbers.push(1, 2, 3, "...", totalPages);
      else if (currentPage >= totalPages - 2)
        pageNumbers.push(1, "...", totalPages - 2, totalPages - 1, totalPages);
      else
        pageNumbers.push(
          1,
          "...",
          currentPage - 1,
          currentPage,
          currentPage + 1,
          "...",
          totalPages
        );
    }
    return pageNumbers;
  };

  const handleFormattedChange = (e, fieldName) => {
    let value = e.target.value.replace(/\D/g, "");
    if (value.length > 10) value = value.slice(0, 10);
    let formatted = "";
    if (value.length > 6) {
      formatted = `(${value.slice(0, 3)}) ${value.slice(3, 6)}-${value.slice(
        6
      )}`;
    } else if (value.length > 3) {
      formatted = `(${value.slice(0, 3)}) ${value.slice(3)}`;
    } else if (value.length > 0) {
      formatted = `(${value}`;
    }
    e.target.value = formatted;
    formik.setFieldValue(fieldName, formatted);
  };

  const handleCompanyFieldChange = (id, field, value) => {
    const updatedCompanies = formik.values.companies.map((company) =>
      company.id === id ? { ...company, [field]: value } : company
    );
    formik.setFieldValue("companies", updatedCompanies);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="custom-card p-0 mb-20">
        <div className="p-15 p-sm-24">
          <h5 className="aa-heading-05 fw-semibold mb-0">User Information</h5>
        </div>
        <div className="devider" />
        <div className="p-15 p-sm-24">
          <div className="row g-4">
            {[
              { label: "First Name*", name: "firstName" },
              { label: "Last Name*", name: "lastName" },
              { label: "Medical Firm", name: "medical_firm" },
              { label: "Phone #", name: "phone", type: "tel" },
              { label: "Fax #", name: "fax", type: "tel" },
              { label: "Office Hours", name: "office_hours", type: "number" },
              { label: "Email Address", name: "email", type: "email" },
              { label: "Website", name: "url", type: "url" },
            ].map((field, i) => (
              <div className="col-12 col-md-6" key={i}>
                <FloatingInputField
                  formik={formik}
                  label={field.label}
                  name={field.name}
                  type={field.type || "text"}
                  onInput={
                    field.name === "phone" || field.name === "fax"
                      ? (e) => handleFormattedChange(e, field.name)
                      : undefined
                  }
                  onChange={
                    field.name !== "phone" && field.name !== "fax"
                      ? formik.handleChange
                      : undefined
                  }
                />
              </div>
            ))}

            <ul className="list-unstyled d-inline-flex gap-3">
              {[
                { label: "Active", name: "active" },
                { label: "Full Access", name: "full_access" },
              ].map((field, i) => (
                <li key={i}>
                  <SwitchField
                    formik={formik}
                    label={field.label}
                    name={field.name}
                    checked={formik.values[field.name]}
                    onChange={(e) =>
                      formik.setFieldValue(field.name, e.target.checked)
                    }
                  />
                </li>
              ))}
            </ul>

            <div className="col-12">
              {companiesLoading ? (
                <Loader />
              ) : companiesError ? (
                <div className="text-danger">Error: {companiesError}</div>
              ) : (
                <div className="custom-card px-24 py-16">
                  <div className="table-responsive max-height-table">
                    <table className="table custom-table-striped custom-table text-center align-middle">
                      <thead className="position-sticky top-0 z-1">
                        <tr>
                          <th>Company</th>
                          <th>Contact with Messages</th>
                          <th>Title</th>
                        </tr>
                      </thead>
                      <tbody>
                        {paginatedData.map((row, index) => (
                          <tr
                            key={row.id}
                            className={index % 2 !== 0 ? "table-row-alt" : ""}
                          >
                            <td
                              onClick={() => handleCompanyFieldChange(row.id, "selected", !row.selected)}
                              className="cursor-pointer"
                            >
                              <input
                                type="checkbox"
                                className="form-check-input me-8"
                                checked={row.selected}
                                onChange={() => handleCompanyFieldChange(row.id, "selected", !row.selected)}
                              />
                              {row.company}
                            </td>
                            <td>
                              <div className="form-check form-switch d-inline-flex justify-content-center">
                                <input
                                  className="form-check-input"
                                  type="checkbox"
                                  checked={row.contactWithMessages}
                                  onChange={() => handleCompanyFieldChange(row.id, "contactWithMessages", !row.contactWithMessages)}
                                />
                              </div>
                            </td>
                            <td>
                              <input
                                type="text"
                                className="form-control form-control-sm"
                                value={row.title}
                                onChange={(e) =>
                                  handleCompanyFieldChange(row.id, "title", e.target.value)
                                }
                              />
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}

              {/* Pagination */}
              <div className="d-flex justify-content-between align-items-center mt-10 flex-wrap gap-3">
                <div className="d-flex align-items-center gap-2">
                  <label className="aa-text-sm text-secondary mb-0">Show</label>
                  <select
                    value={entriesPerPage}
                    onChange={(e) => {
                      setEntriesPerPage(Number(e.target.value));
                      setCurrentPage(1);
                    }}
                    className="form-select form-select-sm"
                    style={{ width: "60px" }}
                  >
                    <option value={10}>10</option>
                    <option value={20}>20</option>
                    <option value={30}>30</option>
                  </select>
                </div>

                <div className="d-flex align-items-center gap-2 custom-pagination">
                  <nav aria-label="Page navigation">
                    <ul className="pagination mb-0">
                      <li
                        className={`page-item ${
                          currentPage === 1 ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            currentPage > 1 && setCurrentPage(currentPage - 1)
                          }
                        >
                          <ArrowLeft color="#153F68" />
                        </button>
                      </li>
                      {getPageNumbers().map((page, index) =>
                        page === "..." ? (
                          <li key={index} className="page-item disabled">
                            <span className="page-link">…</span>
                          </li>
                        ) : (
                          <li
                            key={index}
                            className={`page-item ${
                              currentPage === page ? "active" : ""
                            }`}
                          >
                            <button
                              className="page-link"
                              onClick={() => setCurrentPage(page)}
                            >
                              {page}
                            </button>
                          </li>
                        )
                      )}
                      <li
                        className={`page-item ${
                          currentPage === totalPages ? "disabled" : ""
                        }`}
                      >
                        <button
                          className="page-link"
                          onClick={() =>
                            currentPage < totalPages &&
                            setCurrentPage(currentPage + 1)
                          }
                        >
                          <ArrowRight color="#153F68" />
                        </button>
                      </li>
                    </ul>
                  </nav>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="devider" />
      <div className="mt-20 d-flex justify-content-end">
        <CustomButton
          className="btn-primary rounded-pill"
          loading={formik.isSubmitting}
          text="Next"
          type="submit"
        />
      </div>
    </form>
  );
};

export default UserInformationForm;
