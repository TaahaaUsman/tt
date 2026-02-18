import React, { useState } from "react";
import { useFormik } from "formik";
import * as Yup from "yup";
import FloatingInputField from "../../FormsFields/FloatingInputField";
import CustomMultiSelect from "../../FormsFields/CustomMultiSelect";
import CustomButton from "../../customButton/CustomButton";
import CategorySection from "./CategorySection";

const AddEncounterType = ({ onCreateEncounter, ActiveTab }) => {
  const [showCategories, setShowCategories] = useState(false);
  const [buttonMovedOut, setButtonMovedOut] = useState(false);
  const [categoryQuestions, setCategoryQuestions] = useState({});
  const [customCategoryInput, setCustomCategoryInput] = useState("");
  const [showAddCategoryForm, setShowAddCategoryForm] = useState(false);
  const [categoryOptions, setCategoryOptions] = useState([
    "Disease",
    "Activity",
    "Nutrition",
    "Tabacco",
    "Alcohol",
    "Acciden injury",
    "Screening",
    "Life Balance",
    "Mental Health",
    "+ Add new HRA Category",
  ]);

  const validationSchema = Yup.object({
    encounter_name: Yup.string().trim().required("Encounter name is required"),
    categories: Yup.array().of(Yup.string()).notRequired(),
  });

  const formik = useFormik({
    initialValues: { encounter_name: "", categories: [] },
    validationSchema,
    onSubmit: async (values, { setSubmitting, resetForm }) => {
      try {
        const payload = {
          encounter_name: values.encounter_name.trim(),
          categories: values.categories || [],
        };

        if (typeof onCreateEncounter === "function") {
          await onCreateEncounter(payload);
        } else {
          console.log("Create Encounter payload:", payload);
        }

        if (typeof ActiveTab === "function") {
          ActiveTab("measurements");
        }

        resetForm();
        setShowCategories(false);
        setButtonMovedOut(false);
        setCategoryQuestions({});
      } catch (err) {
        console.error("Failed to create encounter:", err);
      } finally {
        setSubmitting(false);
      }
    },
  });

  const handleAddCustomCategory = () => {
    const trimmedInput = customCategoryInput.trim();

    // Check if category already exists
    if (categoryOptions.includes(trimmedInput)) {
      alert("This category already exists!");
      return;
    }

    if (trimmedInput.length === 0) {
      alert("Please enter a category name");
      return;
    }

    // Create new options list without the "+ Add New HDA Category" and add new category
    const optionsWithoutAddButton = categoryOptions.filter(
      (opt) => opt !== "+ Add New HDA Category"
    );
    const newOptions = [...optionsWithoutAddButton, trimmedInput, "+ Add New HDA Category"];
    setCategoryOptions(newOptions);

    // Auto-select the newly added category
    const currentCategories = formik.values.categories || [];
    formik.setFieldValue("categories", [...currentCategories, trimmedInput]);

    // Clear input and hide form
    setCustomCategoryInput("");
    setShowAddCategoryForm(false);
  };

  return (
    <form onSubmit={formik.handleSubmit}>
      <div className="custom-card p-0 mb-20">
        <div className="p-15 p-sm-24">
          <h5 className="aa-heading-05 fw-semibold mb-0">Add Encounter Type</h5>
        </div>  

        <div className="devider" />

        <div className="p-15 p-sm-24">
          <div className="row g-4">
            <div className="col-12">
              <FloatingInputField
                formik={formik}
                label="Encounter Name*"
                placeholder="Encounter Name"
                name="encounter_name"
                type="text"
              />
            </div>

            {showCategories && (
              <div className="col-12">
                <CustomMultiSelect
                  label="Encounter Categories"
                  name="categories"
                  options={categoryOptions}
                  formik={formik}
                  placeholder="Select categories"
                  onOptionClick={(option) => {
                    // Handle "+ Add New HDA Category" option
                    if (option === "+ Add New HDA Category") {
                      setShowAddCategoryForm(true);
                      // Remove it from selected categories if it was added
                      const filtered = (formik.values.categories || []).filter(
                        (c) => c !== "+ Add New HDA Category"
                      );
                      formik.setFieldValue("categories", filtered);
                      return;
                    }
                  }}
                />
                
                {/* Add New HRA Category Section - Show only when triggered */}
                {showAddCategoryForm && (
                  <div className="mt-4 p-3 bg-light rounded">
                    <label className="form-label fw-semibold mb-2">Add New HRA Category</label>
                    <div className="d-flex gap-2">
                      <input
                        type="text"
                        className="form-control rounded-pill"
                        placeholder="Enter new category name"
                        value={customCategoryInput}
                        onChange={(e) => setCustomCategoryInput(e.target.value)}
                        onKeyPress={(e) => {
                          if (e.key === "Enter") {
                            e.preventDefault();
                            handleAddCustomCategory();
                          }
                        }}
                      />
                      <button
                        type="button"
                        className="btn btn-primary rounded-pill"
                        onClick={handleAddCustomCategory}
                        disabled={!customCategoryInput.trim()}
                      >
                        + Add
                      </button>
                    </div>
                    <button
                      type="button"
                      className="btn btn-outline-secondary btn-sm w-100 mt-2 rounded-pill"
                      onClick={() => {
                        setShowAddCategoryForm(false);
                        setCustomCategoryInput("");
                      }}
                    >
                      Cancel
                    </button>
                  </div>
                )}

              </div>
            )}

            {formik.values.categories && formik.values.categories.length > 0 && (
              <div className="col-12">
                <div className="d-flex flex-wrap gap-2 mt-2">
                  {formik.values.categories.map((cat) => (
                    <div
                      key={cat}
                      className="badge bg-light border rounded-pill d-inline-flex align-items-center px-3 py-2"
                      style={{ gap: 8 }}
                    >
                      <span className="text-dark">{cat}</span>
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          const filtered = (formik.values.categories || []).filter(
                            (c) => c !== cat
                          );
                          formik.setFieldValue("categories", filtered);
                        }}
                        className="btn btn-m btn-link p-0 ms-4"
                        aria-label={`Remove ${cat}`}
                        style={{ color: "#153f68", textDecoration: "none" }}
                      >
                        ×
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* internal button (inside card) - shown until moved out */}
            {!buttonMovedOut && (
              <div className="col-12 mt-20 d-flex justify-content-end">
                <CustomButton
                  className="btn-primary rounded-pill"
                  loading={formik.isSubmitting}
                  text="Create encounter"
                  type="button"
                  onClick={async () => {
                    // mark touched to show validation
                    formik.setFieldTouched("encounter_name", true, false);

                    // validate the field
                    await formik.validateField("encounter_name");

                    // if encounter_name is missing, don't proceed
                    if (!formik.values.encounter_name || formik.errors.encounter_name) {
                      return;
                    }

                    // reveal categories and move button out
                    setShowCategories(true);
                    setButtonMovedOut(true);
                  }}
                />
              </div>
            )}
            
          </div>
        </div>
      </div>

      {/* Render CategorySection for each selected category */}
            {formik.values.categories &&
              formik.values.categories.map((cat, idx) => (
                <CategorySection
                  key={`${cat}-${idx}`}
                  categoryName={cat}
                  categoryId={`${cat}-${idx}`}
                  onSaveQuestion={(q) => {
                    setCategoryQuestions((prev) => {
                      const arr = prev[cat] ? [...prev[cat], q] : [q];
                      return { ...prev, [cat]: arr };
                    });
                  }}
                  onAddCategory={(newCategoryName) => {
                    // Add to category options
                    if (!categoryOptions.includes(newCategoryName)) {
                      setCategoryOptions([...categoryOptions, newCategoryName]);
                    }
                    // Auto-select the new category
                    const currentCategories = formik.values.categories || [];
                    formik.setFieldValue("categories", [...currentCategories, newCategoryName]);
                  }}
                />
              ))}

      {/* external button (moved out) - shown after first click */}
      {buttonMovedOut && (
        <div className="mt-12 d-flex justify-content-end">
          <CustomButton
            className="btn-primary rounded-pill"
            loading={formik.isSubmitting}
            text="Save Changes"
            type="button"
            onClick={async () => {
              // submit the form
              await formik.submitForm();
            }}
          />
        </div>
      )}
    </form>
  );
};

export default AddEncounterType;
