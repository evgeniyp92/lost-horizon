import React, { useEffect, useState } from "react";
import ContentPane from "../ContentPane/ContentPane";
import { Form, Field } from "react-final-form";
import { connect } from "react-redux";
import { notifyUserHitSearch, notifyUserNavigatedAway } from "../../actions";
import { DataGridPro } from "@mui/x-data-grid-pro";
import { dataGridColumnsConfig } from "../../config/dataGridColumns";
import { GridToolbar } from "@mui/x-data-grid-pro";

const __STANDARD_CSS_DECORATOR = `rounded-md bg-cyan-900/25 w-full h-12 mb-4 text-white`;
const __STANDARD_LABEL_DECORATOR = `text-sm text-gray-600 self-start pl-2`;

const SearchView = ({
  notifyUserHitSearch,
  userStartedSearch,
  notifyUserNavigatedAway,
  warehouseRows,
}) => {
  const postForm = async (values) => {
    notifyUserHitSearch();

    let filteredValues = [...warehouseRows];

    // alert(JSON.stringify(values, null, 2));

    // run filters on the data in seuqence, if the fields are not empty

    if (values.name) {
      filteredValues = filteredValues.filter((row) =>
        row.name.includes(values.name)
      );
    }

    if (values.partNumber) {
      filteredValues = filteredValues.filter((row) =>
        row.partNumber.includes(values.partNumber)
      );
    }

    if (values.serialNumber) {
      filteredValues = filteredValues.filter((row) =>
        row.serialNumber.includes(values.serialNumber)
      );
    }

    if (values.isTrackable) {
      filteredValues = filteredValues.filter((row) => row.isTrackable === true);
    }

    setProcessedFilteredValues(filteredValues);
  };

  const [processedFilteredValues, setProcessedFilteredValues] =
    useState(warehouseRows);

  // unmount the table once the user has navigated away
  useEffect(() => {
    return () => {
      notifyUserNavigatedAway();
    };
  }, [notifyUserNavigatedAway]);

  return (
    <ContentPane>
      <div className="w-full h-full flex flex-col items-center justify-start">
        <Form onSubmit={postForm}>
          {({ handleSubmit, form, submitting, pristine, values }) => {
            return (
              <form
                onSubmit={handleSubmit}
                className="h-fit w-full flex flex-col mb-4"
              >
                <div className="flex">
                  <div className="w-1/3 mr-4">
                    <label
                      htmlFor="name"
                      className={`${__STANDARD_LABEL_DECORATOR}`}
                    >
                      Product Name
                    </label>
                    <Field name="name">
                      {(props) => (
                        <input
                          {...props.input}
                          type="text"
                          name="name"
                          id="name"
                          className={`${__STANDARD_CSS_DECORATOR}`}
                        />
                      )}
                    </Field>
                  </div>
                  <div className="w-1/3">
                    <label
                      htmlFor="partNumber"
                      className={`${__STANDARD_LABEL_DECORATOR}`}
                    >
                      Part Number
                    </label>
                    <Field name="partNumber">
                      {(props) => (
                        <input
                          {...props.input}
                          type="text"
                          name="partNumber"
                          id="partNumber"
                          className={`${__STANDARD_CSS_DECORATOR}`}
                        />
                      )}
                    </Field>
                  </div>
                  <div className="w-1/3 ml-4">
                    <label
                      htmlFor="serialNumber"
                      className={`${__STANDARD_LABEL_DECORATOR}`}
                    >
                      Serial Number
                    </label>
                    <Field name="serialNumber">
                      {(props) => (
                        <input
                          {...props.input}
                          type="text"
                          name="serialNumber"
                          id="serialNumber"
                          className={`${__STANDARD_CSS_DECORATOR}`}
                        />
                      )}
                    </Field>
                  </div>
                </div>
                <div className="flex justify-center items-center">
                  <div className="w-fit flex flex-col px-8">
                    <label
                      htmlFor="category"
                      className={`${__STANDARD_LABEL_DECORATOR}`}
                    >
                      Category
                    </label>
                    <Field
                      name="category"
                      component="select"
                      multiple
                      className={`${__STANDARD_CSS_DECORATOR} h-20 pr-16`}
                    >
                      <option value="Display">🖥 Display</option>
                      <option value="PC">💾 PC</option>
                      <option value="Laptop">💻 Laptop</option>
                      <option value="Keyboard">⌨ Keyboard</option>
                      <option value="Mouse">🐁 Mouse</option>
                      <option value="Other">⁉ Other</option>
                    </Field>
                  </div>
                  <div className="w-fit flex flex-col px-8">
                    <label>
                      <Field
                        name="isTrackable"
                        component="input"
                        type="checkbox"
                        value="true"
                        className="rounded"
                      />{" "}
                      Trackables only
                    </label>
                  </div>
                </div>
                <div className="flex items-center justify-center">
                  <button
                    type="submit"
                    disabled={submitting || pristine}
                    className={`w-40 h-12 border-2 rounded-md my-1 shadow-md hover:shadow-lg cursor-pointer transition font-semibold uppercase text-sm mx-2 ${
                      pristine
                        ? `border-neutral-600 text-neutral-600 cursor-default`
                        : `border-cyan-300 hover:bg-cyan-400  text-cyan-300 hover:text-black`
                    }`}
                  >
                    Submit
                  </button>
                  <button
                    type="reset"
                    onClick={() => {
                      form.reset();
                      notifyUserNavigatedAway();
                    }}
                    className="w-40 h-12 border-2 rounded-md my-1 shadow-md hover:shadow-lg cursor-pointer transition font-semibold uppercase text-sm mx-2 border-cyan-300 hover:bg-cyan-400  text-cyan-300 hover:text-black"
                  >
                    Reset
                  </button>
                </div>
              </form>
            );
          }}
        </Form>
        {userStartedSearch && (
          <div className="h-full w-full border border-slate-700 rounded grow">
            <DataGridPro
              rows={processedFilteredValues}
              columns={dataGridColumnsConfig}
              sx={{ border: 0 }}
              loading={warehouseRows[0].id === 1}
              rowHeight={36}
              checkboxSelection
              disableSelectionOnClick
              components={{ Toolbar: GridToolbar }}
            />
          </div>
        )}
      </div>
    </ContentPane>
  );
};

const mapStateToProps = (state, ownProps) => {
  return {
    userStartedSearch: state.userStartedSearch,
    warehouseRows: state.warehouse,
  };
};

export default connect(mapStateToProps, {
  notifyUserHitSearch,
  notifyUserNavigatedAway,
})(SearchView);
