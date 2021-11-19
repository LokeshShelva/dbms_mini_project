import { useEffect, useState } from "react";
import { Navigate } from "react-router";
import { Table, TableBody, TableCell, TableHead, TableRow, styled, tableCellClasses, Button, CircularProgress, Dialog, TextField, DialogTitle, DialogContent, Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import { LocalizationProvider } from "@mui/lab";
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import DatePicker from '@mui/lab/DatePicker';
import enLocale from 'date-fns/locale/en-US';
import axios from "axios";
import FacultyDetailDialog from "./FacultyDetailDialog";
import "./FacultyPageStyles.css";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: "#E0EBFF",
        color: "#256EFF",
        fontSize: 16,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 16,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: "rgba(0,0,0,0.04)",
    },
    '&:nth-of-type(even)': {
        backgroundColor: "#ffffff",
    },
    // hide last border
    // '&:last-child td, &:last-child th': {
    //     border: 0,
    // },
}));

function AddFaculty({ open, onClose, refresh }) {
    const [roles, setRoles] = useState([]);
    const [selectedRole, setSelectedRole] = useState({});
    const [dob, setDob] = useState(null);
    const [joiningDate, setJoiningDate] = useState(null);
    const [formInput, setFormInput] = useState({});

    useEffect(() => {
        axios.get('/api/general/roles').then((val) => setRoles(val.data))
    }, [])

    const setInput = (name, e) => {
        setFormInput((prev) => {
            prev[name] = e.target.value;
            return prev;
        })
    }

    const formatDate = (date) => {
        let d = new Date(date);
        let dte = Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()).toString();
        return dte;
    }

    const onSubmit = () => {
        const input = { ...formInput, "dob": formatDate(dob), "joining_date": formatDate(joiningDate), "role_id": selectedRole.id };
        axios.post('/api/faculty', input).then((val) => {
            if (val.status == 200) {
                refresh()
                onClose();
            }
        })
    }

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle >Add Faculty</DialogTitle>
            <DialogContent className="faculty-page-add-container">
                <div className="faculty-page-inner-container">
                    <TextField variant="outlined" placeholder="Name" className="fill-parent faculty-page-name-field" onChange={(e) => setInput('name', e)} />
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale} className="faculty-page-dob-field">
                        <DatePicker
                            label="Dob"
                            value={dob}
                            onChange={(val) => setDob(val)}
                            renderInput={(params) => <TextField {...params} helperText={params?.inputProps?.placeholder} />}
                        />
                    </LocalizationProvider>
                    <TextField variant="outlined" placeholder="Salary" type="number" className="faculty-page-salary-field" onChange={(e) => setInput('salary', e)} />
                    <TextField variant="outlined" placeholder="House No" className="faculty-page-house-field" onChange={(e) => setInput('house_no', e)} />
                    <TextField variant="outlined" placeholder="Street name" className="faculty-page-street-field" onChange={(e) => setInput('street_name', e)} />
                    <TextField variant="outlined" placeholder="City" className="faculty-page-city-field" onChange={(e) => setInput('city', e)} />
                    <TextField variant="outlined" placeholder="State" className="faculty-page-state-field" onChange={(e) => setInput('state', e)} />
                    <FormControl>
                        <InputLabel id="faculty-page-role-id">Role</InputLabel>
                        <Select labelId="faculty-page-role-id" label="Role" value={selectedRole} onChange={(e) => setSelectedRole(e.target.value)}>
                            {roles.map(
                                (role) => {
                                    return (
                                        <MenuItem value={role} key={role.id}>{role.role}</MenuItem>
                                    )
                                }
                            )}
                        </Select>
                    </FormControl>
                    <TextField variant="outlined" placeholder="Blood group" className="faculty-page-blood-field" onChange={(e) => setInput('blood_group', e)} />
                    <LocalizationProvider dateAdapter={AdapterDateFns} locale={enLocale} className="faculty-page-date-field">
                        <DatePicker
                            value={joiningDate}
                            onChange={(val) => setJoiningDate(val)}
                            label="Joining date"
                            renderInput={(params) => <TextField {...params} helperText={params?.inputProps?.placeholder} />}
                        />
                    </LocalizationProvider>
                    <Button variant="contained" className="add-faculty-btn" onClick={onSubmit}>Add Faculty</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}


function FacultyPage({ role }) {
    const [faculty, setFaculty] = useState([]);
    const [open, setOpen] = useState(false);
    const [selectedFaculty, setSelectedFaculty] = useState({});
    const [openAddDialog, setOpenAddDialog] = useState(false);

    const fetchData = () => {
        axios.get('/api/faculty?small=true').then(
            (val) => {
                const data = val.data.map(
                    (faculty) => {
                        faculty['dob'] = formatDate(faculty.dob);
                        return faculty;
                    })
                setFaculty(data);
            }
        )
    }

    useEffect(fetchData, [])

    const handleClose = () => {
        setOpen(false);
        setOpenAddDialog(false);
    };

    const formatDate = (date) => {
        let d = new Date(parseFloat(date)).toISOString();
        d = d.split('T')[0].split('-').reverse().join("/")
        return d;
    }

    const refresh = () => {
        fetchData()
    }

    const onDetailClick = (id) => {
        const toSentanceCase = (string) => {
            return string[0].toUpperCase() + string.substring(1, string.length);
        }

        axios.get(`/api/faculty/${id}`).then(
            (val) => {
                val.data[0]['dob'] = formatDate(val.data[0].dob)
                val.data[0]['joining_date'] = formatDate(val.data[0].joining_date);
                val.data[0]['role'] = toSentanceCase(val.data[0].role);
                setSelectedFaculty(val.data[0]);
                setOpen(true);
            }
        )
    }

    // console.log(faculty)

    const onAddDialogClick = () => {
        setOpenAddDialog(true);
    }

    if (role === "teacher") {
        return <Navigate to="/students"></Navigate>
    }

    return (
        <div className="container">
            <div className="inner-container">
                {faculty.length !== 0 ?
                    <>
                        <div className="another-container">
                            <Table className="table">
                                <TableHead>
                                    <TableRow>
                                        <StyledTableCell>No</StyledTableCell>
                                        <StyledTableCell>Name</StyledTableCell>
                                        <StyledTableCell>D.O.B</StyledTableCell>
                                        <StyledTableCell>Salary</StyledTableCell>
                                        <StyledTableCell></StyledTableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {
                                        faculty.map(
                                            (val, index) => {
                                                return (<>
                                                    <StyledTableRow key={val.id}>
                                                        <StyledTableCell>{index + 1}</StyledTableCell>
                                                        <StyledTableCell>{val.name}</StyledTableCell>
                                                        <StyledTableCell>{val.dob}</StyledTableCell>
                                                        <StyledTableCell>{val.salary}</StyledTableCell>
                                                        <StyledTableCell><Button key={val.id} onClick={() => onDetailClick(val.id)}>details</Button></StyledTableCell>
                                                    </StyledTableRow>
                                                </>
                                                )
                                            }
                                        )
                                    }
                                </TableBody>
                            </Table>
                        </div>
                        <div className="faculty-btn-container">
                            <FacultyDetailDialog open={open} onClose={handleClose} faculty={selectedFaculty}></FacultyDetailDialog>
                            <Button className="faculty-btn" variant="contained" onClick={onAddDialogClick}>add faculty</Button>
                            <AddFaculty open={openAddDialog} onClose={handleClose} refresh={refresh}></AddFaculty>
                        </div>
                    </> :
                    <div style={{ "width": "fit-content", "margin": "auto" }}>
                        <CircularProgress />
                    </div>
                }

            </div>
        </div >
    )
}

export default FacultyPage;