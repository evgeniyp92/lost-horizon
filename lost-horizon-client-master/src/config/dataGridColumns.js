import { Link } from "react-router-dom";

export const dataGridColumnsConfig = [
  {
    field: "name",
    headerName: "Name",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "partNumber",
    headerName: "Part Number",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "serialNumber",
    headerName: "Serial #",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "quantity",
    headerName: "Quantity",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  {
    field: "cost",
    headerName: "Cost",
    headerAlign: "center",
    align: "center",
    flex: 1,
  },
  // {
  //   field: "location",
  //   headerName: "Location",
  //   headerAlign: "center",
  //   align: "center",
  //   flex: 1,
  //   renderCell: function (params) {
  //     if (params.row.location) {
  //       return `BLDG ${params.row.location.deployedLocation.building} - RM ${params.row.location.deployedLocation.room} - DSK ${params.row.location.deployedLocation.desk}`;
  //     }
  //     return "NO DATA";
  //   },
  // },
  {
    field: "isTrackable",
    headerName: "Tracked",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
    renderCell: function (params) {
      if (params.value === true) {
        return (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='green'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M5 13l4 4L19 7'
            />
          </svg>
        );
      } else {
        return (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='red'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M6 18L18 6M6 6l12 12'
            />
          </svg>
        );
      }
    },
  },
  {
    field: "deployed",
    headerName: "Deployed",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
    renderCell: function (params) {
      if (params.row.location.isDeployed) {
        return (
          <svg
            xmlns='http://www.w3.org/2000/svg'
            className='h-6 w-6'
            fill='none'
            viewBox='0 0 24 24'
            stroke='green'
            strokeWidth={2}
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M5 13l4 4L19 7'
            />
          </svg>
        );
      }
      return (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          className='h-6 w-6'
          fill='none'
          viewBox='0 0 24 24'
          stroke='red'
          strokeWidth={2}
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6 18L18 6M6 6l12 12'
          />
        </svg>
      );
    },
  },
  {
    field: "location",
    headerName: "Location",
    headerAlign: "center",
    align: "center",
    flex: 2,
    renderCell: function (params) {
      if (params.row.location.isDeployed) {
        return `BLDG ${params.row.location.deployedLocation.building} - RM ${params.row.location.deployedLocation.room} - DSK ${params.row.location.deployedLocation.desk}`;
      }
      return `WHSE ${params.row.location.warehouseLocation.building} - RM ${
        params.row.location.warehouseLocation.stockroom
      } - SHLF ${params.row.location.warehouseLocation.shelf} - LVL ${
        params.row.location.warehouseLocation.level || "A"
      }`;
    },
  },
  {
    field: "assignedItec",
    headerName: "ITEC",
    headerAlign: "center",
    align: "center",
    flex: 1,
    renderCell: function (params) {
      if (params.row.assignedItec) {
        return `${params.row.assignedItec.rank} ${params.row.assignedItec.lastName}`;
      }
      return "NO DATA";
    },
  },
  {
    field: "info",
    headerName: "Info",
    headerAlign: "center",
    align: "center",
    flex: 0.5,
    renderCell: function (params) {
      return (
        <Link to={`./${params.row._id}`}>
          <button>
            <svg
              xmlns='http://www.w3.org/2000/svg'
              className='h-6 w-6'
              fill='none'
              viewBox='0 0 24 24'
              stroke='#67e8f9'
              strokeWidth={2}
            >
              <path
                strokeLinecap='round'
                strokeLinejoin='round'
                d='M10 21h7a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v11m0 5l4.879-4.879m0 0a3 3 0 104.243-4.242 3 3 0 00-4.243 4.242z'
              />
            </svg>
          </button>
        </Link>
      );
    },
  },
];
