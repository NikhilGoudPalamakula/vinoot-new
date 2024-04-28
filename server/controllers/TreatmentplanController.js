const TreatmentPlan = require("../models/Treatmentplanmodel");

exports.createTreatmentPlan = async (req, res) => {
  const { plan_id, category_name, plan_name, GST, days, price, updatedAt } = req.body;

  try {
    const newPlan = await TreatmentPlan.create({
      plan_id,
      category_name,
      plan_name,
      GST,
      days,
      price,
      updatedAt,
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