import { Input, Select } from 'antd';
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
    </>
  );
};

export default ScheduleTab;
