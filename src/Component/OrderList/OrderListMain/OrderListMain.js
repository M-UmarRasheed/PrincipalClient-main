import React, { useMemo } from "react";

import { useTable, usePagination } from "react-table";
import "./OrderListMain.css";

import { useState } from "react";
import {
  Button,
  FormControl,
  Grid,
  NativeSelect,
  TextField,
} from "@material-ui/core";

import { useHistory } from "react-router-dom";

const COLUMNS = [
  {
    Header: "NAME",
    accessor: "NAME",
  },
  {
    Header: "PHONE_NUMBER",
    accessor: "PHONE_NUMBER",
  },
  {
    Header: "LICENSE",
    accessor: "LICENSE",
  },
  {
    Header: "TERMINAL_ALLOWED",
    accessor: "TERMINAL_ALLOWED",
  },
  {
    Header: "SMS_LICENSE",
    accessor: "SMS_LICENSE",
  },
  {
    Header: "SMS_STATUS",
    accessor: "SMS_STATUS",
  },
  {
    Header: "SMS_DEADLINE_DATE",
    accessor: "SMS_DEADLINE_DATE",
  },

  {
    Header: "SMS_COST",
    accessor: "SMS_COST",
  },
  {
    Header: "LICENSE_COST",
    accessor: "LICENSE_COST",
  },
  {
    Header: "UID",
    accessor: "UID",
  },
  {
    Header: "ACTIVATION_DATE",
    accessor: "ACTIVATION_DATE",
  },
];

const OrderListMain = ({ orderList, setOrderList }) => {
  console.log(orderList);

  const handleDate = (date) => {
    if (date) {
      const newDate = new Date(date).getDate();
      const newMonth = new Date(date).getMonth() + 1;
      const newYear = new Date(date).getFullYear();

      let dateLength = newDate;
      dateLength = dateLength > 9 ? dateLength : "0" + dateLength;

      const fullDate = `${newYear}-${newMonth}-${dateLength}`;
      return fullDate;
    }
  };
  const history = useHistory();
  const handleUserDelete = (userID) => {
    const id = userID.row.original._id;
    console.log(id);
    fetch(
      // `http://principalserver-env-1.eba-hyfmp7pu.us-east-2.elasticbeanstalk.com/deleteUser/${id}`,
      `http://localhost:4000/deleteUser/${id}`,

      {
        method: "DELETE",
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          const userName = sessionStorage.getItem("token");
          const password = sessionStorage.getItem("password");

          fetch(
            `http://http://localhost:4000/allUsers/${userName}-${password}`
          )
            .then((res) => res.json())
            .then((data) => {
              setOrderList(data);
              alert("user deleted successfully");
            });
        } else {
        }
      });
  };
  const handleUpdate = (id, e) => {
    console.log(id, e.target.value, e.target.name);
    if (e.target.value) {
      fetch(
        "http://localhost:4000/updateUserData",
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            id: id,
            status: e.target.value,
            name: e.target.name,
          }),
        }
      )
        .then((res) => res.json())
        .then((data) => {
          if (data) {
            alert("update successful");
          }
        });
    }
  };

  const handleChange = (id, e) => {
    fetch(
      // "http://principalserver-env-1.eba-hyfmp7pu.us-east-2.elasticbeanstalk.com/updateStatus",
      "http://localhost:4000/updateStatus",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, status: e.target.value }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("update successful");
        }
      });
  };
  const handleSmsDate = (id, e) => {
    fetch(
      // "http://principalserver-env-1.eba-hyfmp7pu.us-east-2.elasticbeanstalk.com/updateSmsDate",
      "http://localhost:4000/updateSmsDate",
      {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: id, date: e.target.value }),
      }
    )
      .then((res) => res.json())
      .then((data) => {
        if (data) {
          alert("update successful");
        }
      });
  };

  //react-table functions

  const columns = useMemo(() => COLUMNS, []);
  const data = useMemo(() => orderList, [orderList]);

  const {
    getTableProps,
    getTableBodyProps,
    nextPage,
    previousPage,
    canNextPage,
    canPreviousPage,
    headerGroups,
    page,
    pageOptions,
    state,

    prepareRow,
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 50 },
    },
    usePagination
  );
  const { pageIndex } = state;
  const handleNextDate = (monthNumber) => {
    var currentDate = new Date();
    var newDate = currentDate.setMonth(currentDate.getMonth() + monthNumber);
    return handleDate(new Date(newDate));
  };

  return (
    <div className="row">
      <div className="px-5 employeeCard py-5">
        <table className="table table-bordered h7 rounded" {...getTableProps()}>
          <thead>
            {headerGroups.map((headergroup) => (
              <tr {...headergroup.getHeaderGroupProps()}>
                {headergroup.headers.map((column) => {
                  return (
                    <th
                      className={`${column.Header} text-secondary text-uppercase `}
                      scope="col"
                      {...column.getHeaderProps()}
                    >
                      {column.render("Header")}
                    </th>
                  );
                })}
                <th
                  className="text-secondary text-uppercase text-center"
                  scope="col"
                >
                  Action
                </th>
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()}>
            {page.map((row) => {
              prepareRow(row);
              return (
                <tr {...row.getRowProps()}>
                  {row.cells.map((cell) => {
                    return (
                      <>
                        {/* <td
                          for="employee"
                          style={{ fontWeight: "bold", color: "#0A0A0A" }}
                          className={`${cell.column.Header} `}
                          {...cell.getCellProps()}
                        >
                          {cell.render("Cell")}
                        </td> */}
                        {cell.column.Header === "NAME" && (
                          <td
                            style={{ fontWeight: "bold", color: "#0A0A0A" }}
                            className="text-weight-bold serviceName"
                          >
                            <FormControl fullWidth>
                              <TextField
                                name="NAME"
                                onBlur={(e) =>
                                  handleUpdate(cell.row.original._id, e)
                                }
                                placeholder={cell.row.original.NAME}
                              />
                            </FormControl>
                          </td>
                        )}
                        {cell.column.Header === "PHONE_NUMBER" && (
                          <td
                            style={{ fontWeight: "bold", color: "#0A0A0A" }}
                            className="text-weight-bold contact"
                          >
                            {cell.row.original.PHONE_NUMBER}
                          </td>
                        )}
                        {cell.column.Header === "LICENSE" && (
                          <td
                            style={{ fontWeight: "bold", color: "#0A0A0A" }}
                            className="text-weight-bold serviceName"
                          >
                            {cell.row.original.LICENSE}
                          </td>
                        )}
                        {cell.column.Header === "TERMINAL_ALLOWED" && (
                          <td
                            style={{ fontWeight: "bold", color: "#0A0A0A" }}
                            className="text-weight-bold"
                          >
                            <FormControl fullWidth>
                              <TextField
                                name="TERMINAL_ALLOWED"
                                onBlur={(e) =>
                                  handleUpdate(cell.row.original._id, e)
                                }
                                placeholder={cell.row.original.TERMINAL_ALLOWED}
                              />
                            </FormControl>
                          </td>
                        )}
                        {cell.column.Header === "SMS_LICENSE" && (
                          <td
                            style={{ fontWeight: "bold", color: "#0A0A0A" }}
                            className="text-weight-bold"
                          >
                            {cell.row.original.SMS_LICENSE}
                          </td>
                        )}
                        {cell.column.Header === "SMS_STATUS" && (
                          <td className="text-weight-bold">
                            <FormControl
                              onChange={(e) =>
                                handleChange(cell.row.original._id, e)
                              }
                              fullWidth
                            >
                              <NativeSelect>
                                {cell.row.original.SMS_STATUS === "1" && (
                                  <>
                                    <option value={"1"}>{"1"}</option>
                                    <option value={"0"}>{"0"}</option>
                                  </>
                                )}
                                {cell.row.original.SMS_STATUS === "0" && (
                                  <>
                                    <option value={"0"}>{"0"}</option>
                                    <option value={"1"}>{"1"}</option>
                                  </>
                                )}
                                {cell.row.original.SMS_STATUS === "" && (
                                  <>
                                    <option value={"0"}>{"0"}</option>
                                    <option value={"1"}>{"1"}</option>
                                  </>
                                )}
                              </NativeSelect>
                            </FormControl>
                          </td>
                        )}
                      {cell.column.Header === "SMS_DEADLINE_DATE" && (
                          <td
                            style={{ fontWeight: "bold", color: "#0A0A0A" }}
                            className="text-weight-bold"
                          >
                            <FormControl
                              onChange={(e) =>
                                handleSmsDate(cell.row.original._id, e)
                              }
                              fullWidth
                            >
                              <NativeSelect>
                                {cell.row.original.SMS_DEADLINE_DATE ? (
                                  <option
                                    value={handleDate(
                                      cell.row.original.SMS_DEADLINE_DATE
                                    )}
                                  >
                                    {handleDate(
                                      cell.row.original.SMS_DEADLINE_DATE
                                    )}
                                  </option>
                                ) : (
                                  <option value={""}>{""}</option>
                                )}

                                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12].map(
                                  (option) => (
                                    <option value={handleNextDate(option)}>
                                      {handleNextDate(option)}
                                    </option>
                                  )
                                )}
                              </NativeSelect>
                            </FormControl>
                          </td>
                        )}
                        {cell.column.Header === "SMS_COST" && (
                          <td
                            style={{ fontWeight: "bold", color: "#0A0A0A" }}
                            className="text-weight-bold contact"
                          >
                            {cell.row.original.SMS_COST}
                          </td>
                        )}
                        {cell.column.Header === "LICENSE_COST" && (
                          <td
                            style={{ fontWeight: "bold", color: "#0A0A0A" }}
                            className="text-weight-bold contact"
                          >
                            {cell.row.original.LICENSE_COST}
                          </td>
                        )}

                        {cell.column.Header === "UID" && (
                          <td
                            style={{ fontWeight: "bold", color: "#0A0A0A" }}
                            className="text-weight-bold serviceName"
                          >
                            {cell.row.original.UID}
                          </td>
                        )}
                        {cell.column.Header === "ACTIVATION_DATE" && (
                          <td
                            style={{ fontWeight: "bold", color: "#0A0A0A" }}
                            className="text-weight-bold serviceName"
                          >
                            {cell.row.original.ACTIVATION_DATE}
                          </td>
                        )}

                        {cell.column.Header === "ACTIVATION_DATE" && (
                          <td
                            style={{ fontWeight: "bold", color: "#0A0A0A" }}
                            className="text-weight-bold"
                          >
                            <Button
                              type="submit"
                              onClick={() => handleUserDelete(cell)}
                              variant="outlined"
                              style={{
                                color: "white",
                                backgroundColor: "#ff000061",
                              }}
                              color="error"
                            >
                              Delete
                            </Button>
                          </td>
                        )}
                      </>
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>
        <div className="d-flex justify-content-center">
          <button
            className="me-2 btn   btn-secondary"
            onClick={() => previousPage()}
            disabled={!canPreviousPage}
          >
            Previous
          </button>
          <span className="pageCounter d-flex align-items-center">
            <strong> </strong>
            {pageIndex + 1} of {pageOptions.length} <strong> </strong>
          </span>
          <button
            className="ms-2 btn btn-primary"
            onClick={() => nextPage()}
            disabled={!canNextPage}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default OrderListMain;
