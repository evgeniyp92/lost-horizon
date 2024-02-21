import React from 'react';
import ContentPane from '../ContentPane/ContentPane';
import { DataGridPro } from '@mui/x-data-grid-pro';
import { dataGridColumnsConfig } from '../../config/dataGridColumns';
import { GridToolbar } from '@mui/x-data-grid-pro';
import { connect } from 'react-redux';

const InventoryView = ({ warehouseRows }) => {
  return (
    <ContentPane disablePadding>
      <div className="flex w-full h-full">
        {warehouseRows.length > 1 && (
          <DataGridPro
            columns={dataGridColumnsConfig}
            sx={{ border: 0 }}
            rows={warehouseRows}
            rowHeight={36}
            checkboxSelection
            disableSelectionOnClick
            components={{ Toolbar: GridToolbar }}
          />
        )}
      </div>
    </ContentPane>
  );
};

const mapStateToProps = (state) => {
  return {
    warehouseRows: state.warehouse,
  };
};

export default connect(mapStateToProps, null)(InventoryView);
