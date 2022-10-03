
exports.uploadImages = async (req,res)=>{
    try {
    res.json('welcome picture controller')
    } catch (error) {
        return res.status(500).json({message: error.message});
    }
}