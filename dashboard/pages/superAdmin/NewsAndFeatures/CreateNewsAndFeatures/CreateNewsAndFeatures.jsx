import React, { useEffect, useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import GoBack from "../../../../components/GoBack/GoBack";
import CustomSingleSelect from "../../../../components/FormsFields/CustomSingleSelect";
import FloatingInputField from "../../../../components/FormsFields/FloatingInputField";
import CustomButton from "../../../../components/customButton/CustomButton";
import { useSearchParams, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchCompanies,
  fetchNews,
  createNews,
  updateNews,
} from "../../../../redux/features/newsAndFeaturesSlice";
import toast from "react-hot-toast";

const CreateNewsAndFeatures = () => {
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // Get companies and all news from the Redux slice
  const { companies, allNews } = useSelector((state) => state.news || {});

  const newsId = searchParams.get("newsId");
  const isEditing = Boolean(newsId);

  // Load Companies
  useEffect(() => {
    dispatch(fetchCompanies());
  }, [dispatch]);

  // Fetch all news (needed for edit mode)
  useEffect(() => {
    dispatch(fetchNews());
  }, [dispatch]);

  // Find the correct existing news from the list
  const existingNews = isEditing
    ? allNews?.find((item) => String(item?.id) === String(newsId))
    : null;

  // Company dropdown
  const fallbackCompanyOptions = ["Wellness Workday", "Future Corp", "Global Solutions"];
  const companyOptions =
    Array.isArray(companies) && companies.length
      ? companies.map(
          (c) =>
            c?.name ||
            c?.identifyingName ||
            c?.identifying_name ||
            c?.id
        )
      : fallbackCompanyOptions;

  const programNameOptions = [
    "Wellness Workday",
    "Wellness Works Wonders",
    "Health Program",
  ];

  const priorityOptions = ["10", "9", "7", "5", "1"];

  // Validation Schema
  const validationSchema = Yup.object().shape({
    selectCompany: isEditing ? Yup.string() : Yup.string().required("Company is required"),
    wellnessProgramName: Yup.string().required("Wellness Program Name is required"),
    title: Yup.string().required("Title is required"),
    priority: Yup.string().required("Priority is required"),
    expirationDate: Yup.string().required("Expiration Date is required"),
    body: Yup.string().required("Body is required"),
  });

  // Formik Setup
  const formik = useFormik({
    initialValues: {
      selectCompany: "",
      wellnessProgramName: "",
      title: "",
      priority: "",
      expirationDate: "",
      body: "",
    },
    enableReinitialize: true,
    validationSchema,
    onSubmit: (values) => {

      let companyId;

      // Company ID only required when CREATING
      if (!isEditing) {
        const selectedCompany = companies?.find(
          (c) =>
            c?.name === values.selectCompany ||
            c?.identifyingName === values.selectCompany ||
            c?.identifying_name === values.selectCompany
        );

        companyId = selectedCompany?.id;
        if (!companyId) {
          console.error("Company ID not found!");
          return;
        }
      }

      const payload = {
        title: values.title,
        body: values.body,
        priority: Number(values.priority),
        expirationDate: values.expirationDate,
        programName: values.wellnessProgramName,
        ...(isEditing ? {} : { companyId }),
      };

      if (isEditing) {
        dispatch(updateNews({ id: newsId, ...payload }))
          .unwrap()
          .then((res) => {
            toast.success("News updated successfully");
            navigate('/news-and-features');
          })
          .catch((err) => toast.error("Failed to update news"));
      } else {
        dispatch(createNews(payload))
          .unwrap()
          .then((res) => { 
            toast.success("News created successfully"); 
            navigate('/news-and-features'); 
          })
          .catch((err) => toast.error("Failed to create news"));
      }
    },
  });

  // Pre-fill form for EDIT mode
  useEffect(() => {
    if (isEditing && existingNews) {
      formik.setValues({
        selectCompany: existingNews?.companyName || "",
        wellnessProgramName: existingNews?.programName || "",
        title: existingNews?.title || "",
        priority: existingNews?.priority?.toString() || "",
        expirationDate: existingNews?.expirationDate?.slice(0, 10) || "",
        body: existingNews?.body || "",
      });
    }
  }, [existingNews, isEditing]);

  return (
    <>
      <GoBack />

      <div className="mt-13 mb-15 d-flex justify-content-between flex-wrap gap-2">
        <div className="page-title">
          <h3 className="aa-heading-04 fw-semibold mb-5">
            {isEditing ? "Edit News & Features" : "Create News & Features"}
          </h3>
          <p className="aa-text-xs text-muted">
            Organize and maintain News & Features
          </p>
        </div>
      </div>

      <form onSubmit={formik.handleSubmit}>
        <div className="custom-card p-0 mb-20">
          <div className="p-15 p-sm-24">
            <h5 className="aa-heading-05 fw-semibold mb-0">News & Features</h5>
          </div>

          <div className="devider"></div>

          <div className="row g-4 p-15 p-sm-24">
            {!isEditing && (
              <div className="col-12 col-md-6">
                <CustomSingleSelect
                  label="Select Company"
                  name="selectCompany"
                  options={companyOptions}
                  formik={formik}
                  placeholder="Select Company"
                />
              </div>
            )}

            <div className="col-12 col-md-6">
              <CustomSingleSelect
                label="Wellness Program Name"
                name="wellnessProgramName"
                options={programNameOptions}
                formik={formik}
                placeholder="Select Program"
              />
            </div>

            <div className="col-12 col-md-6">
              <CustomSingleSelect
                label="Priority"
                name="priority"
                options={priorityOptions}
                formik={formik}
                placeholder="Select Priority"
              />
            </div>

            <div className="col-12 col-md-6">
              <FloatingInputField
                formik={formik}
                label="Expiration Date"
                name="expirationDate"
                type="date"
              />
            </div>

            <div className="col-12 col-md-6">
              <FloatingInputField formik={formik} label="Title" name="title" type="text" />
            </div>

            <div className="col-12 col-md-6">
              <FloatingInputField
                formik={formik}
                label="Body"
                name="body"
                type="textarea"
              />
            </div>

            <div className="d-flex justify-content-end gap-3 mt-3">
              <CustomButton
                text={isEditing ? "Update" : "Save"}
                type="submit"
                className="btn-primary rounded-pill"
              />
            </div>
          </div>
        </div>
      </form>
    </>
  );
};

export default CreateNewsAndFeatures;
