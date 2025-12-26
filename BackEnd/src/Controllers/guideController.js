const Guide = require("../model/User/Guide");


exports.searchGuides = async (req, res) => {
    try {
        const { language, location } = req.query;
        const guides = await Guide.find({
            languages: language,
            location: location
        });
        res.json(guides);
    } catch (err) { res.status(500).json({ error: err.message }); }
};

exports.GellAllGuides = async (req, res) => {
    try {
        const guides = await Guide.find();
        if (!guides) {
            res.status(404).json({ error: err.message });
        }
        res.status(200).json({ message: "Get All Guides Passs", guides });

    } catch (error) {
        res.status(500).json({ error: err.message });
    }
}
exports.UpdateGuides = async (req, res) => {
    try {
        const { id } = req.body;

        const guide = await Guide.findById(id);

        if (!guide) {
            return res.status(404).json({ message: "Guide not found" });
        }

        if (!guide.availability || guide.availability.length === 0) {
            guide.availability = [{ isAvailable: false }];
        } else {
            guide.availability[0].isAvailable = !guide.availability[0].isAvailable;
        }

        await guide.save();

        res.status(200).json({
            message: "Update success",
            guide
        });

    } catch (error) {
        res.status(500).json({ error: error.message });
    }
};
