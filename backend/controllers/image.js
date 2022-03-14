
exports.upload = (req, res)=>{ 
if(req.file.filename){
    res.status(201).json({ message: 'Image téléchargée.',
url: req.file.filename});
}else{
    res.status(500).json({error: 'Image non téléchargée.'})
}
};
