import { Button, Grid, MenuItem, Popover, TextField } from "@material-ui/core";
import { useForm } from "react-hook-form";
import axios from "axios";
import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import "./LicReg.css";
import { useHistory } from "react-router-dom";

const LicReg = () => {
  const [uploaded, setUpload] = useState(false);
  const { register, handleSubmit, reset } = useForm();
  const history = useHistory();

  const [smsDatePickerOpen, setSmsDatePickerOpen] = React.useState(false);
  const [issueDatePickerOpen, setIssueDatePickerOpen] = React.useState(false);

  const onSubmit = (data, e) => {
    console.log(data);
     const url = `http://localhost:4000/LicenseRegistration`;

    // const url = `http://principalserver-env-1.eba-hyfmp7pu.us-east-2.elasticbeanstalk.com/LicenseRegistration`;

    axios.post(url, data).then((res) => {
      if (res) {
        alert("done");
      }
    });
    reset();
  };

  // handle date pickers

  //  handle date changes

  return (
    <>
      <Grid container justifyContent="center">
        <Grid
          item
          xs={12}
          md={5}
          style={{
            backgroundColor: "#fff",
            padding: "10px 20px",
            marginBottom: "30px",
            margin: "0 10px",
          }}
        >
          <Grid container>
            <Grid item xs={3}>
              <Button
                onClick={() => history.push("users")}
                type="submit"
                variant="contained"
                style={{ backgroundColor: "grey", marginBottom: "20px" }}
                color="primary"
              >
                back
              </Button>
            </Grid>
            <Grid item xs={12}>
              <h4 className="text-uppercase">Add your user:</h4>
            </Grid>
          </Grid>

          <form
            className="shadow  mt-2 p-5"
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              required
              style={{ marginBottom: "20px", padding: "15px 0" }}
              {...register("NAME")}
              label="Name"
            />

            <TextField
              {...register("LICENSE")}
              style={{ marginBottom: "40px", padding: "15px 0" }}
              label="License Key"
            />

            <TextField
              style={{ marginBottom: "20px", padding: "15px 0" }}
              {...register("TERMINAL_ALLOWED")}
              label="Terminal Allowed"
            />
            <TextField
              style={{ marginBottom: "20px", padding: "15px 0" }}
              {...register("SMS_LICENSE")}
              label="sms license"
            />
            {/* <TextField
              style={{ marginBottom: "20px", padding: "15px 0" }}
              id="standard-select-currency"
              select
              label="Sms Status"
              value={smsStatus}
              onChange={handleChange}
              required
            >
              {["pending", "activated"].map((option) => (
                <MenuItem key={option} value={option}>
                  {option}
                </MenuItem>
              ))}
            </TextField> */}
            <TextField
              style={{ marginBottom: "20px", padding: "15px 0" }}
              {...register("SMS_COST")}
              label="sms cost"
            />
            <TextField
              style={{ marginBottom: "20px", padding: "15px 0" }}
              {...register("LICENSE_COST")}
              label="license cost"
            />

            <Grid item xs={3}>
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: "#388e3c" }}
                color="primary"
              >
                save
              </Button>
            </Grid>
          </form>
        </Grid>
        <Grid
          style={{
            backgroundColor: "#fff",
            padding: "10px 20px",
            marginBottom: "30px",
            margin: "0 10px",
            marginTop: "30px",
          }}
          item
          xs={12}
          md={5}
        >
          <form
            className="excelFile shadow mt-5 p-5 rounded"
            action="http://localhost:4000/LicenseInfoUpload"
            method="post"
            encType="multipart/form-data"
          >
            <label style={{ marginBottom: "10px" }}>
              Upload your Excel file
            </label>
            <br />
            <label htmlFor="fileBtn" className="uploadBtn">
              {uploaded ? (
                <p style={{ color: "green" }}>file uploaded</p>
              ) : (
                <p style={{ color: "black" }}>Upload Here</p>
              )}
            </label>
            <input
              onChange={() => setUpload(true)}
              type="file"
              name="file"
              id="fileBtn"
              accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
              required
              hidden
            />

            <Grid item xs={3}>
              <Button
                onClick={() => setUpload(false)}
                type="submit"
                value="Upload"
                variant="contained"
                style={{ backgroundColor: "#388e3c", marginTop: "20px" }}
                color="primary"
              >
                Upload
              </Button>
            </Grid>
          </form>
        </Grid>
      </Grid>
    </>
  );
};

export default LicReg;
