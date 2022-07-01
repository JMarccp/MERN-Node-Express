const express = require('express');
const { nextTick } = require('process');
const router = express.Router();
const Note = require('../models/note.js');

router.get('/', async (req, res) => {
    try{
        const notes = await Note.find();
        res.json(notes);
    } catch {
        res.status(500).json({ message: err.message });
    }
});

router.get('/:id', getNote, (req, res) => {
    res.json(res.note);
});

router.post('/', async (req, res) => {
    const note = new Note({
        noteTitle: req.body.noteTitle,
        noteBody: req.body.noteBody
    });
    try {
        const newNote = await note.save();
        res.status(201).json(newNote);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
})

router.delete('/:id', getNote, async (req, res) => {
    try {
        await res.note.remove();
        res.json({ message: 'deleted note.' });
    } catch {
        res.status(500).json({ message: 'could not find note.' });
    }
});

router.patch('/:id', getNote, async (req, res) => {
    if (req.body.noteTitle != null) {
        res.note.noteTitle = req.body.noteTitle;
    }
    if (req.body.noteBody != null){
        res.note.noteBody = req.body.noteBody;
    }
    try {
        const updateNote = await res.note.save();
        res.json(updateNote);
    } catch (err) {
        res.status(400).json({ message: 'note not updated'});
    }
});

async function getNote(req, res, next) {
    let note;
    try {
        note = await Note.findById(req.params.id);
        if(note == null){
            return res.status(404), json({ message: 'Cannot find note.'});
        }
    } catch (err) {
        return res.status(500).json({ message: 'The ID selected was not found.'});
    }
    res.note = note;
    next();
}

module.exports = router;