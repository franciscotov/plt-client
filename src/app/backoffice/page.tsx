"use client";
import { useState } from "react";
import { TutenTable } from "@/components/molecules/Table";
import { Columns, containerStyles } from "./contants";
import ViewModel from "./ViewModel";
import { Tab, Tabs, Grid } from "@mui/material";

const Backoffice = () => {
  const {
    getData,
    refresh,
    actions,
    handleChange,
    tabs,
    handleIndex,
    status,
  } = ViewModel();

  return (
    <>
      <div style={containerStyles}>
        <Grid container spacing={4}>
          <Grid item xs={12} md={12}>
            <Tabs
              TabIndicatorProps={{
                style: {
                  backgroundColor: "primary",
                },
              }}
              sx={{ width: "100%", justifySelf: 'center' }}
              indicatorColor="primary"
              textColor="primary"
              value={status}
              onChange={handleChange}
              aria-label="basic tabs example"
              centered
              variant="fullWidth"
            >
              {tabs
                .filter((tab) => tab.visible)
                .map(({ title, state }, index) => {
                  return (
                    <Tab
                      key={index}
                      label={title}
                      {...handleIndex(state)}
                      style={{ lineHeight: "24px" }}
                      value={state}
                    />
                  );
                })}
            </Tabs>
          </Grid>
          <Grid item xs={12} md={12}>
            <TutenTable
              actions={actions}
              getData={getData}
              columns={Columns(status)}
              elevation={1}
              fieldToActive={"active"}
              refresh={refresh}
              rowPage={10}
            />
          </Grid>
        </Grid>
      </div>
    </>
  );
};

export default Backoffice;
