import React from "react"
import Sidebar from "./components/Sidebar"
import Editor from "./components/Editor"
import Split from "react-split"
import { onSnapshot, addDoc, doc, deleteDoc, setDoc } from "firebase/firestore"
import { db, notesCollection } from "./firebase"
import "./App.css"
export default function App() {
    const [notes, setNotes] = React.useState([])
    
    const [currentNoteId, setCurrentNoteId] = React.useState(
        (notes[0]?.id) || ""
    )
    const [tempNoteText, setTempNoteText] = React.useState("")
    

    const currentNote = 
        notes.find(note => note.id === currentNoteId) 
        || notes[0]
    
    const sortedNotes = notes.sort((a, b) => b.updatedAt - a.updatedAt)
    console.log(sortedNotes)

        React.useEffect(() => {
            const unsubscribe = onSnapshot(notesCollection, function(snapshot) {
                // Sync up our local notes array with the snapshot data
                const notesArr = snapshot.docs.map(doc => ({
                    ...doc.data(),
                    id: doc.id
                }))
                setNotes(notesArr)
            })
            return unsubscribe
        }, [])

        React.useEffect(() => {
            if (!currentNoteId) {
                setCurrentNoteId(notes[0]?.id)
            }
        }, [notes])

        React.useEffect(() => {
            if (currentNote) {
                setTempNoteText(currentNote.body)
            }
        }, [currentNote])

        React.useEffect(() => {
            const timeoutId = setTimeout(() => {
                updateNote(tempNoteText)
            }, 500)
            return () => clearTimeout(timeoutId)
        }, [tempNoteText])

    async function createNewNote() {
        const newNote = {
            body: "# Type your markdown note's title here",
            createdAt: Date.now(),
            updatedAt: Date.now()
        }
        const newNoteRef = await addDoc(notesCollection, newNote)
        setCurrentNoteId(newNoteRef.id)
    }

    async function updateNote(text) {
        const docRef = doc(db, "notes", currentNoteId)
        await setDoc(docRef, { body: text, updatedAt: Date.now() }, { merge: true })
    }

    function deleteNote(noteId) {
        const docref = doc(db,"notes", noteId)// this thing is gonna getme a document reference 
        deleteDoc(docref);
    }

    return (
        <main>
            {
                notes.length > 0
                    ?
                    <Split
                        sizes={[30, 70]}
                        direction="horizontal"
                        className="split"
                    >
                        <Sidebar
                            notes={sortedNotes}
                            currentNote={currentNote}
                            setCurrentNoteId={setCurrentNoteId}
                            newNote={createNewNote}
                            deleteNote={deleteNote}
                        />
                        
                            <Editor
                                tempNoteText={tempNoteText}
                                setTempNoteText={setTempNoteText}
                            />
                        
                    </Split>
                    :
                    <div className="no-notes">
                        <h1>You have no notes</h1>
                        <button
                            className="first-note"
                            onClick={createNewNote}
                        >
                            Create one now
                </button>
                    </div>

            }
        </main>
    )
}
