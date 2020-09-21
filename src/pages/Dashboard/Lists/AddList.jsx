import React, { useState } from "react";
import { useDispatch } from "react-redux";

// Material
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent";

import * as actions from "./actions";

export default function AddList(props) {
    const dispatch = useDispatch();

    const [open, setOpen] = useState(false);
    const [listName, setListName] = useState("");
    const [error, setError] = useState(false);

    const handleClose = () => {
        setOpen(false);
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!listName) {
            setError(true);
            return;
        }
        dispatch(actions.addList(listName));
        setOpen(false);
    };

    const handleChange = (update) => {
        setListName(update);
    };

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={() => setOpen(true)}
            >
                Add List
            </Button>
            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="form-dialog-title"
                fullWidth={true}
            >
                <DialogTitle id="form-dialog-title">Add List</DialogTitle>
                <DialogContent>
                    <form onSubmit={handleSubmit}>
                        <TextField
                            autoFocus
                            margin="dense"
                            label="List Name"
                            type="text"
                            fullWidth
                            value={listName}
                            error={error}
                            onChange={(e) => handleChange(e.target.value)}
                        />
                        <div className="actions">
                            <Button onClick={handleClose} color="secondary">
                                Cancel
                            </Button>
                            <Button type="submit" color="primary">
                                Confirm
                            </Button>
                        </div>
                    </form>
                </DialogContent>
            </Dialog>
        </div>
    );
}
