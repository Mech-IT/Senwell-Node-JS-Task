import express from "express"
const router = express.Router();
import UserModel from "../database/userModel.js"


router.post("/createEmployee", async (req, res) => {
    try {

        const user = await UserModel.findOne({ email: req.body.email })

        if (user) {
            return res.status(400).json({ error: "Employee already exist with this email address." })
        }
        await UserModel.create({ ...req.body })
        return res.status(200).json({ success: "employee created successfully." })

    } catch (error) {
        console.log("error", error);
        return res.status(400).json({ error: "Something went wrong..." })
    }
})

router.post("/deleteEmployee", async (req, res) => {
    try {
        await UserModel.findByIdAndDelete(req.body.id)
        res.status(200).json({ success: "Employee deleted successfully." })
    } catch (error) {
        console.log("error", error);
        return res.status(400).json({ error: "Something went wrong..." })
    }
})



router.get("/getEmployee", async (req, res) => {
    try {
        const employee_id = req.query.id;
        const sort = req.query.sort;
        const filter = req.query.filter;
        const sortOrder=req.query.sortOrder

        if (employee_id) {
            const matchStage = {
                $match: {
                    employee_id: { $regex: new RegExp(employee_id, "i") }
                }
            };

            const pipeline = [matchStage];

            const userArray = await UserModel.aggregate(pipeline);

            return res.status(200).json({ userArray });
        }

        if (sort) {
            const sortStage = {
                $sort: {
                    [sort]: sortOrder === "asc" ? 1 : -1
                }
            };

            const pipeline = [sortStage];

            const userArray = await UserModel.aggregate(pipeline);

            return res.status(200).json({ userArray });
        }

        if (filter) {
            const matchStage = {
                $match: {
                    department: { $regex: new RegExp(filter, "i") }
                }
            };

            const pipeline = [matchStage];

            const userArray = await UserModel.aggregate(pipeline);

            return res.status(200).json({ userArray });
        }

        const userArray = await UserModel.find({})
        return res.status(200).json({ userArray });

    } catch (error) {
        console.log("error", error);
        return res.status(400).json({ error: "Something went wrong..." });
    }
});







router.post("/updateEmployee", async (req, res) => {
    try {
        const user = await UserModel.findByIdAndUpdate(req.body.id, { ...req.body }, { new: true })
        return res.status(200).json({ success: "Employee updated successfully." })
    } catch (error) {
        console.log("error", error);
        return res.status(400).json({ error: "Something went wrong..." })
    }
})




export default router