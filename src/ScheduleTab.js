import { Input, Select } from 'antd';
import {Field, FieldArray, FormikProvider} from "formik";
const { Option } = Select;

const ScheduleTab = ({ formik }) => {
  const inputChanged = (e) => {
    formik.validateField('scheduleTabInput');
    formik.setFieldTouched('scheduleTabInput', true);
    formik.setFieldValue('scheduleTabInput', e?.target?.value);
  };
  const selectChanged = (selection) => {
    formik.validateField('scheduleTabSelect');
    formik.setFieldTouched('scheduleTabSelect', true);
    formik.setFieldValue('scheduleTabSelect', selection);
  };
  return (
    <>
      <div style={{ marginBottom: '30px', width: '400px' }}>
        <Input
          placeholder="Basic usage"
          onChange={inputChanged}
          onBlur={() => formik.validateField('scheduleTabInput')}
          status={formik?.touched?.scheduleTabInput && formik?.errors?.scheduleTabInput ? 'error' : ''}
        />
        {formik?.touched?.scheduleTabInput && formik?.errors?.scheduleTabInput && (
          <p style={{ color: 'red' }}>{formik?.errors?.scheduleTabInput}</p>
        )}
      </div>
      <div style={{ marginBottom: '30px', width: '400px' }}>
        <Select
          placeholder="Select treatment"
          onChange={selectChanged}
          onBlur={() => formik.validateField('scheduleTabSelect')}
          status={formik?.touched?.scheduleTabSelect && formik?.errors?.scheduleTabSelect ? 'error' : ''}
        >
          <Option value="treatment-1">Treatment 1</Option>
          <Option value="treatment-2">Treatment 2</Option>
          <Option value="treatment-3">Treatment 3</Option>
          <Option value="treatment-4">Treatment 4</Option>
        </Select>
        {formik?.touched?.scheduleTabSelect && formik?.errors?.scheduleTabSelect && (
          <p style={{ color: 'red' }}>{formik?.errors?.scheduleTabSelect}</p>
        )}
      </div>
      <h1>Field Array Testing</h1>
      <FormikProvider value={formik}>
        <FieldArray
            name="friends"
            render={arrayHelpers => (
                <div>
                  {formik.values.friends && formik.values.friends.length > 0 ? (
                      formik.values.friends.map((friend, index) => (
                          <div key={index}>
                            <Field name={`friends.${index}`} />
                            <button
                                type="button"
                                onClick={() => arrayHelpers.remove(index)} // remove a friend from the list
                            >
                              -
                            </button>
                            <button
                                type="button"
                                onClick={() => arrayHelpers.insert(index, '')} // insert an empty string at a position
                            >
                              +
                            </button>
                              {(formik?.touched?.friends?.[index] && formik?.errors?.friends?.[index]) &&
                                  <p style={{color: 'red'}}>{formik?.errors?.friends?.[index]}</p>
                              }
                          </div>
                      ))
                  ) : (
                      <button type="button" onClick={() => arrayHelpers.push('')}>
                        {/* show this when user has removed all friends from the list */}
                        Add a friend
                      </button>
                  )}
                  <div>
                    <button type="submit">Submit</button>
                  </div>
                </div>
            )}
        />
      </FormikProvider>
    </>
  );
};

export default ScheduleTab;
