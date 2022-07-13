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
    scheduleTabInput: Yup.string().required('Required'),
    scheduleTabSelect: Yup.string().required('Required'),
    audienceTabInput: Yup.string().required('Required'),
    audienceTabSelect: Yup.string().required('Required'),
  });

  const formik = useFormik({
    initialValues: {
      scheduleTabInput: '',
      scheduleTabSelect: '',
      audienceTabInput: '',
      audienceTabSelect: '',
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
        formik.validateField('scheduleTabSelect');
        break;
      case 'audienceTab':
        formik.validateField('audienceTabInput');
        formik.validateField('audienceTabSelect');
        break;
      default:
        break;
    }
  };

  const onChange = (key) => {
    runTabValidation(activeTab);
    setActiveTab(key);
  };

  useEffect(() => {
    const tabErrorState = Object.keys(formik.errors).reduce(
      (tabErrorState, error) => {
        if (!tabErrorState.scheduleTabInvalid) {
          tabErrorState.scheduleTabInvalid = error.includes('scheduleTab');
        }
        if (!tabErrorState.audienceTabInvalid) {
          tabErrorState.audienceTabInvalid = error.includes('audienceTab');
        }
        return tabErrorState;
      },
      {
        scheduleTabInvalid: false,
        audienceTabInvalid: false,
      },
    );
    setTabErrorState(tabErrorState);
  }, [formik?.errors, setTabErrorState]);

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
