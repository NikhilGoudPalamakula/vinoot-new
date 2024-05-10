const TreatmentCategory = require("../models/Treatmentcategorymodel");

exports.createTreatmentCategory = async (req, res) => {
  const {
    category_id,
    category_name,
    status = "active",
    modifiedBy,
    createdBy,
    createdAt,
    modifiedAt,
  } = req.body;

  try {
    const newCategory = await TreatmentCategory.create({
      category_id,
      category_name,
      status,
      modifiedBy,
      createdBy,
      createdAt,
      modifiedAt,
    });
    res
      .status(201)
      .json({ message: "Category created successfully", newCategory });
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

exports.getAllTreatmentCategories = async (req, res) => {
  try {
    const categories = await TreatmentCategory.find({});
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

exports.updateCategoryStatus = async (req, res) => {
  const { category_id } = req.params;
  const { category_name, status, modifiedBy, modifiedAt } = req.body;

  try {
    const updatedCategory = await TreatmentCategory.findOneAndUpdate(
      { category_id },
      { category_name, status, modifiedBy, modifiedAt },
      { new: true }
    );

    if (!updatedCategory) {
      return res.status(404).json({ message: "Category not found" });
    }

    res
      .status(200)
      .json({ message: "Category status updated", updatedCategory });
  } catch (error) {
    res.status(500).json({ message: "Error updating category status", error });
  }
};
