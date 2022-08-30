import 'antd/dist/antd.css';
import { Tabs, Col, Row, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import {setNestedObjectValues, useFormik} from 'formik';
import ScheduleTab from './ScheduleTab';
import AudienceTab from './AudienceTab';
import * as Yup from 'yup';
import { isEmpty } from 'lodash';
const { TabPane } = Tabs;

const scheduleFields = {
  scheduleTabInput: '',
  scheduleTabSelect: '',
  scheduleTabDynamicField: ['field1'],
  validation: {
    scheduleTabInput: Yup.string().matches(/^(hi|bye)$/, 'field must either be "hi" or "bye"').required('Required'),
    scheduleTabSelect: Yup.string().required('Required'),
    scheduleTabDynamicField: Yup.array().of(
        Yup.string().required('Dynamic Field Required')
    )
  }
}

const audienceFields = {
  audienceTabSelect: '',
  audienceTabInput: '',
  validation: {
    audienceTabInput: Yup.string().required('Required'),
    audienceTabSelect: Yup.string().required('Required'),
  }
}

// should be enum but this repo is not using typescript
const tabs = ['schedule' , 'audience']

const fieldConfig = {
  [tabs[0]]: {
    ...scheduleFields
  },
  [tabs[1]]: {
    ...audienceFields
  }
}

const App = () => {
  const [activeTab, setActiveTab] = useState('scheduleTab');
  const [tabErrorState, setTabErrorState] = useState({
    scheduleTabInvalid: false,
    audienceTabInvalid: false,
  });

  const validationSchema = Yup.object().shape({
    ...scheduleFields.validation,
    ...audienceFields.validation,
  });

  const formik = useFormik({
    initialValues: {
      ...fieldConfig.schedule,
      ...fieldConfig.audience,
    },
    validationSchema,
  });

  const runTabValidation = (tab) => {
    switch (tab) {
      case 'scheduleTab':
        formik.validateField('scheduleTabInput');
        formik.setFieldTouched('scheduleTabInput', true);
        formik.validateField('scheduleTabSelect');
        formik.setFieldTouched('scheduleTabSelect', true);
        break;
      case 'audienceTab':
        formik.validateField('audienceTabInput');
        formik.setFieldTouched('audienceTabInput', true);
        formik.validateField('audienceTabSelect');
        formik.setFieldTouched('audienceTabSelect', true);
        break;
      default:
        break;
    }
  };

  const lockForProofing = async () => {
    const errors = await formik.validateForm();
    if (!isEmpty(errors)) {
      await formik.setTouched(setNestedObjectValues(errors, true));
      setActiveTab('schedule')
      console.table(formik.values);
    }
  };

  const onChange = (key) => {
    runTabValidation(activeTab);
    setActiveTab(key);
  };


  useEffect(() => {
    const errorKeys = Object.keys(formik.errors)

    const tabErrorState2 = tabs.reduce((acc, tab) => (
       {...acc, [tab]: false}
    ), {})

    for (const tab of tabs) {
      for (const field of Object.keys(fieldConfig[tab])) {
        if (!tabErrorState2[tab]) {
          tabErrorState2[tab] = Object.keys(formik.touched).includes(field) && errorKeys.includes(field)
        }
      }
    }
    console.log('tabErrorState2', tabErrorState2)

    setTabErrorState(tabErrorState2);
  }, [formik?.errors, setTabErrorState, activeTab]);
  // console.log('formik', JSON.stringify( formik, null, 2))

  return (
    <>
      <Row>
        <Col span={12} offset={6}>
          <Button
            style={{ marginTop: '30px' }}
            block="true"
            type="primary"
            onClick={lockForProofing}
          >
            Lock For Proofing
          </Button>
        </Col>
      </Row>
      <Row>
        <Col span={12} offset={6}>
          <Tabs defaultActiveKey="scheduleTab" centered onChange={onChange}>
            <TabPane
              tab={
                tabErrorState.schedule
                  ? '!Schedule Error!'
                  : 'Schedule'
              }
              key="scheduleTab"
            >
              <ScheduleTab formik={formik} />
            </TabPane>
            <TabPane
              tab={
                tabErrorState.audience
                  ? '!Audience Error!'
                  : 'Audience'
              }
              key="audienceTab"
            >
              <AudienceTab formik={formik} />
            </TabPane>
          </Tabs>
        </Col>
      </Row>
    </>
  );
};

export default App;
