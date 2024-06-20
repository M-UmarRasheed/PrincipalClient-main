import {
  Button,
  FormControl,
  Grid,
  MenuItem,
  TextField,
} from "@material-ui/core";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useHistory } from "react-router-dom";

import OrderListMain from "./OrderListMain/OrderListMain";
const filterData = [
  {
    value: "NAME",
  },
  {
    value: "PHONE_NUMBER",
  },
  {
    value: "LICENSE",
  },
  {
    value: "TERMINAL_ALLOWED",
  },
  {
    value: "SMS_LICENSE",
  },
  {
    value: "SMS_STATUS",
  },
  {
    value: "SMS_DEADLINE_DATE",
  },
  {
    value: "SMS_COST",
  },
  {
    value: "LICENSE_COST",
  },
  {
    value: "UID",
  },
  {
    value: "ACTIVATION_DAT",
  },
];

const OrderList = () => {
  const history = useHistory();
  const handleLogOut = () => {
    sessionStorage.removeItem("token");
    history.push("/login");
  };

  const [orderList, setOrderList] = useState([]);
  const [mainData, setMainData] = useState([]);
  const userName = sessionStorage.getItem("token");
  const password = sessionStorage.getItem("password");
  useEffect(() => {
    // fetch(`http://principalserver-env-1.eba-hyfmp7pu.us-east-2.elasticbeanstalk.com/allUsers/${userName}-${password}`)
    fetch(`http://localhost:4000/allUsers`)
      .then((res) => res.json())
      .then((data) => {
        console.log("🚀 ~ .then ~ data:", data)
        setMainData(data);
        setOrderList(data);
      });
  }, []);
  const { register, handleSubmit, reset } = useForm();

  const [filter, setFilter] = React.useState("");

  const handleFilter = (event) => {
    setFilter(event.target.value);
  };
  const onSubmit = (data, e) => {
    if (!filter) alert("please choose any filter");

    if (filter) {
      console.log(filter, data);
      const newList = mainData.filter((op) => {
        console.log(op[filter], data.search);
        return op[filter] === data.search;
      });
      setOrderList(newList);
    }

    setFilter("");
    reset();
  };

  return (
    <>
      <div className="row">
        <div className="col-md-12">
          <h4 className=" ms-2 text-secondary mt-3  ">DashBoard</h4>
          <Grid container justifyContent="center">
            <Grid item xs={5} md={2}>
              <FormControl fullWidth>
                <TextField
                  id="standard-select-currency"
                  select
                  variant="outlined"
                  style={{ padding: "15px 0" }}
                  label="Choose filter"
                  value={filter}
                  onChange={handleFilter}
                  required
                >
                  {filterData.map((option) => (
                    <MenuItem key={option.value} value={option.value}>
                      {option.value}
                    </MenuItem>
                  ))}
                </TextField>
              </FormControl>
            </Grid>
            <Grid item xs={5} md={5}>
              <form
                style={{ display: "flex", flexDirection: "row" }}
                onSubmit={handleSubmit(onSubmit)}
              >
                <TextField
                  fullWidth
                  required
                  {...register("search")}
                  style={{ padding: "15px 0" }}
                  variant="outlined"
                  label="Search"
                />
                <Grid item xs={2} md={2}>
                  <Button
                    type="submit"
                    variant="outlined"
                    style={{
                      color: "white",
                      margin: "12px 5px",
                      backgroundColor: "#1b1bd2bd",
                      padding: "15px",
                    }}
                    color="error"
                  >
                    search
                  </Button>
                </Grid>
              </form>
            </Grid>
          </Grid>
          <div className="  mt-5">
            <div className=" mx-3 mt-3">
              <div className="row">
                <div className="col-md-1 mb-2">
                  <Button
                    type="submit"
                    onClick={() => history.push("/admin")}
                    variant="outlined"
                    style={{ color: "white", backgroundColor: "green" }}
                    color="error"
                  >
                    Insert
                  </Button>
                </div>

                <div className="col-md-2">
                  <Button
                    type="submit"
                    onClick={handleLogOut}
                    variant="outlined"
                    style={{ color: "white", backgroundColor: "#ff000061" }}
                    color="error"
                  >
                    Log out
                  </Button>
                </div>
              </div>
              <h5 className="text-color mt-5">Check Users</h5>
            </div>
            <OrderListMain
              setOrderList={setOrderList}
              orderList={orderList}
            ></OrderListMain>
          </div>
        </div>
      </div>
    </>
  );
};

export default OrderList;
