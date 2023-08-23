import React from 'react';

import DataTable from 'react-data-table-component';

import './DataTableComponent.css';

const DataTableComponent = ({ columns, data }) => {
  return (
    <DataTable 
        columns={columns} 
        data={data} 
        pagination
    />
  );
};

export default DataTableComponent;

