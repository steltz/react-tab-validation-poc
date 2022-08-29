import 'antd/dist/antd.css';
import { Tabs, Col, Row, Button } from 'antd';
import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import ScheduleTab from './ScheduleTab';
import AudienceTab from './AudienceTab';
import * as Yup from 'yup';
import { isEmpty } from 'lodash';
const { TabPane } = Tabs;

const App = () => {
  const [activeTab, setActiveTab] = useState('scheduleTab');
  const [tabErrorState, setTabErrorState] = useState({
    scheduleTabInvalid: false,
    audienceTabInvalid: false,
  });

  const validationSchema = Yup.object().shape({
    scheduleTabInput: Yup.string().matches(/^(hi|bye)$/, 'field muyst either be "hi" or "bye"').required('Required'),
    scheduleTabSelect: Yup.string().required('Required'),
    audienceTabInput: Yup.string().required('Required'),
    audienceTabSelect: Yup.string().required('Required'),
    friends: Yup.array().of(
        Yup.string().required('Dynamic Field Required')
    )
  });

  const formik = useFormik({
    initialValues: {
      scheduleTabInput: '',
      scheduleTabSelect: '',
      audienceTabInput: '',
      audienceTabSelect: '',
      friends: [],
    },
    validationSchema,
  });

  const lockForProofing = async () => {
    const errors = await formik.validateForm();
    if (isEmpty(errors)) {
      console.table(formik.values);
    }
  };

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

  const onChange = (key) => {
    runTabValidation(activeTab);
    setActiveTab(key);
  };

  const errorKeys = Object.keys(formik.errors)

  useEffect(() => {
    const tabErrorStateTouched = Object.keys(formik.touched).reduce(
        (tabErrorState, touched) => {
          if (!tabErrorState.scheduleTabInvalid) {
            tabErrorState.scheduleTabInvalid = touched.includes('scheduleTab') && errorKeys.includes(touched);
          }
          if (!tabErrorState.audienceTabInvalid) {
            tabErrorState.audienceTabInvalid = touched.includes('audienceTab') && errorKeys.includes(touched);
          }
          return tabErrorState
        }
        ,
        {
          scheduleTabInvalid: false,
          audienceTabInvalid: false,
        },
    )
    console.log('tabErrorState', tabErrorState)
    console.log('tabErrorStateTouched', tabErrorStateTouched)

    setTabErrorState(tabErrorStateTouched);
  }, [formik?.errors, setTabErrorState, activeTab]);
  console.log('formik', JSON.stringify( formik, null, 2))

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
                tabErrorState.scheduleTabInvalid
                  ? '!Schedule Error!'
                  : 'Schedule'
              }
              key="scheduleTab"
            >
              <ScheduleTab formik={formik} />
            </TabPane>
            <TabPane
              tab={
                tabErrorState.audienceTabInvalid
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
