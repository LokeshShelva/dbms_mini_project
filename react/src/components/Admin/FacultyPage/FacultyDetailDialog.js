import { CircularProgress, Dialog, DialogContent, DialogTitle, Divider, Grid, Typography } from "@mui/material";
import { useEffect, useState } from "react"
import axios from "axios";
import { Box } from "@mui/system";
import "./FacultyPageStyles.css";

export default function FacultyDetailDialog({ faculty, onClose, open }) {
    return (
        <Dialog onClose={onClose} open={open} style={{ minWidth: "50%" }}>
            <DialogTitle><Typography variant="h4"> {faculty.name}</Typography></DialogTitle>
            <Divider />
            <DialogContent>
                <div className="grid-container">
                    <Typography variant="h6" className="center">Dob</Typography>
                    <Typography variant="subtitle1" className="center">{faculty.dob}</Typography>
                    <Typography variant="h6" className="center">Salary</Typography>
                    <Typography variant="subtitle1" className="center">Rs. {faculty.salary}</Typography>
                    <Typography variant="h6" className="center">Role</Typography>
                    <Typography variant="subtitle1" className="center">{faculty.role}</Typography>
                    <Typography variant="h6" className="center">Blood Group</Typography>
                    <Typography variant="subtitle1" className="center">{faculty.blood_group}</Typography>
                    <Typography variant="h6" className="center">Joining date</Typography>
                    <Typography variant="subtitle1" className="center">{faculty.joining_date}</Typography>
                    <Typography variant="h6">Address</Typography>
                    <div>
                        <Typography variant="subtitle1" className="center">{faculty.address.house_no},</Typography>
                        <Typography variant="subtitle1" className="center">{faculty.address.street_name},</Typography>
                        <Typography variant="subtitle1" className="center">{faculty.address.city},</Typography>
                        <Typography variant="subtitle1" className="center">{faculty.address.state}</Typography>
                    </div>
                </div>
            </DialogContent>

        </Dialog>
    )
}