"use client";
import { useState } from "react";
import { TutenTable } from "@/components/molecules/Table";
import { Columns, containerStyles } from "./contants";
import ViewModel from "./ViewModel";
import i18n from "@/i18n/i18n-es.json";

const Backoffice = () => {
  const actions = () => [
    {
      text: i18n.activateGame,
      close: true,
      visible: true,
      action: async (row: any) => {
        // let arr = professionals.filter(
        //   pro => pro.professionalId !== row.professionalId,
        // )
        // setProfessionals(arr)
        // setRefreshProfessionalList(!refreshProfessionalList)
      },
    },
  ];
  const [refresh, setrefresh] = useState(true);
  const { getDataGames } = ViewModel();

  return (
    <>
      <div style={containerStyles}>
        <TutenTable
          actions={actions}
          getData={getDataGames}
          columns={Columns}
          elevation={1}
          fieldToActive={"activo"}
          refresh={refresh}
          rowPage={10}
        />
      </div>
    </>
  );
};

export default Backoffice;
