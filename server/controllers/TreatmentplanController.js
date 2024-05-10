const TreatmentPlan = require("../models/Treatmentplanmodel");

exports.createTreatmentPlan = async (req, res) => {
  const {
    plan_id,
    category_name,
    plan_name,
    GST,
    GSTamount,
    TotalAmount,
    days,
    price,
    createdAt,
    createdBy,
    modifiedAt,
    modifiedBy,
  } = req.body;

  try {
    const newPlan = await TreatmentPlan.create({
      plan_id,
      category_name,
      plan_name,
      GST,
      GSTamount,
      TotalAmount,
      days,
      price,
      createdAt,
      createdBy,
      modifiedAt,
      modifiedBy,
    });

    res.status(201).json({ message: "Plan created successfully", newPlan });
  } catch (error) {
    res.status(500).json({ message: "Error creating plan", error });
  }
};

exports.getAllTreatmentPlans = async (req, res) => {
  try {
    const treatmentPlans = await TreatmentPlan.find({});
    res.status(200).json(treatmentPlans);
  } catch (error) {
    res.status(500).json({ message: "Error fetching treatment plans", error });
  }
};
exports.updatePlanStatus = async (req, res) => {
  const { plan_id } = req.params;
  const {
    status,
    modifiedBy,
    modifiedAt,
    plan_name,
    GST,
    days,
    price,
    GSTamount,
    TotalAmount,
    category_name,
  } = req.body;

  try {
    const updatedPlan = await TreatmentPlan.findOneAndUpdate(
      { plan_id },
      {
        status,
        modifiedBy,
        modifiedAt,
        plan_name,
        GST,
        days,
        price,
        GSTamount,
        TotalAmount,
        category_name,
      },
      { new: true }
    );

    if (!updatedPlan) {
      return res.status(404).json({ message: "Plan not found" });
    }

    res.status(200).json({ message: "Plan updated", updatedPlan });
  } catch (error) {
    res.status(500).json({ message: "Error updating Plan", error });
  }
};
