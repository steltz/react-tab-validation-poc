import { Input, Select } from 'antd';
const { Option } = Select;

const AudienceTab = ({ formik }) => {
  const inputChanged = (e) => {
    formik.validateField('audienceTabInput');
    formik.setFieldTouched('audienceTabInput', true);
    formik.setFieldValue('audienceTabInput', e?.target?.value);
  };
  const selectChanged = (selection) => {
    formik.validateField('audienceTabSelect');
    formik.setFieldTouched('audienceTabSelect', true);
    formik.setFieldValue('audienceTabSelect', selection);
  };
  return (
    <>
      <div style={{ marginBottom: '30px', width: '400px' }}>
        <Input
          placeholder="Basic usage"
          onChange={inputChanged}
          onBlur={() => formik.validateField('audienceTabInput')}
          status={formik?.touched?.audienceTabInput && formik?.errors?.audienceTabInput ? 'error' : ''}
        />
        {formik?.touched?.audienceTabInput && formik?.errors?.audienceTabInput && (
          <p style={{ color: 'red' }}>{formik?.errors?.audienceTabInput}</p>
        )}
      </div>
      <div style={{ marginBottom: '30px', width: '400px' }}>
        <Select
          placeholder="Select treatment"
          onChange={selectChanged}
          onBlur={() => formik.validateField('audienceTabSelect')}
          status={formik?.touched?.audienceTabSelect &&  formik?.errors?.audienceTabSelect ? 'error' : ''}
        >
          <Option value="treatment-1">Treatment 1</Option>
          <Option value="treatment-2">Treatment 2</Option>
          <Option value="treatment-3">Treatment 3</Option>
          <Option value="treatment-4">Treatment 4</Option>
        </Select>
        {formik?.touched?.audienceTabSelect && formik?.errors?.audienceTabSelect && (
          <p style={{ color: 'red' }}>{formik?.errors?.audienceTabSelect}</p>
        )}
      </div>
    </>
  );
};

export default AudienceTab;
