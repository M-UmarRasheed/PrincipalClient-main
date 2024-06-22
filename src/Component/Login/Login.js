import { Button, Grid, TextField } from "@material-ui/core";
import React, { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { useHistory, useLocation } from "react-router-dom";
import { userContext } from "../../App";

const Login = () => {
  const [error, setError] = useState(false);
  const [loggedInUser, setLoggedInUser] = useContext(userContext);
  const { register, handleSubmit, reset } = useForm();
  const history = useHistory();
  const location = useLocation();
  const fromArray = [];

  let { from } = location.state || { from: { pathname: "/" } };
  fromArray.push(from);

  const onSubmit = (data, e) => {
    console.log(data);
    // const url = `http://principalserver-env-1.eba-hyfmp7pu.us-east-2.elasticbeanstalk.com/isAdmin/${
      const url = `http://3.254.126.176:4000/isAdmin/${
      data.userName + "-" + data.password
    }`;
    axios.get(url).then((res) => {
      console.log("🚀 ~ axios.get ~ res:", res.data)
      if (res.data === "") {
        setError(true);
      }
      if (res.data !== "") {
        console.log(res);

        setLoggedInUser(res.data);
        sessionStorage.setItem("token", res.data.userName);
        sessionStorage.setItem("password", res.data.password);
        history.push("/users");
      }
    });
  };
  return (
    <div>
      <Grid container justifyContent="center">
        <Grid
          item
          xs={12}
          md={4}
          className="mt-5 p-5 shadow rounded"
          style={{
            backgroundColor: "#fff",
            padding: "10px 20px",
            marginBottom: "30px",
            margin: "0 10px",
          }}
        >
          <form
            style={{ display: "flex", flexDirection: "column" }}
            onSubmit={handleSubmit(onSubmit)}
          >
            <TextField
              required
              variant="outlined"
              style={{ marginBottom: "20px", padding: "15px 0" }}
              {...register("userName")}
              label="UserName"
            />
            <TextField
              required
              variant="outlined"
              type="password"
              style={{ marginBottom: "20px", padding: "15px 0" }}
              {...register("password")}
              label="Password"
            />

            <Grid item xs={5}>
              <Button
                type="submit"
                variant="contained"
                style={{ backgroundColor: "#388e3c" }}
                color="Primary"
              >
                Log in
              </Button>
            </Grid>
            {error && (
              <Grid
                item
                xs={12}
                class="alert text-uppercase alert-danger mt-5"
                role="alert"
              >
                username and password not matched
              </Grid>
            )}
          </form>
        </Grid>
      </Grid>
    </div>
  );
};

export default Login;
