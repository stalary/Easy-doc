import React, { useEffect, useState } from 'react';
import { connect } from 'dva';
import { Dispatch, AnyAction } from 'redux';
import { ServiceState } from '../../models/service';
import { ConnectState } from '@/models/connect';
import HeaderCard from '@/components/HeaderCard';
import ServiceTab from '@/components/ServiceTab';
import { BASE_URL } from '@/utils/request';

interface ServiceDetailProps {
  dispatch: Dispatch<AnyAction>;
  serviceData: ServiceState;
  location: any;
}

const ServiceDetail: React.FC<ServiceDetailProps> = props => {
  const { location, dispatch } = props;
  const [serviceUrl, setUrl] = useState(BASE_URL);

  useEffect(() => {
    if (location.state && location.state.url) {
      dispatch({
        type: 'service/fetchServiceDetail',
        payload: { url: location.state.url },
      });
      setUrl(location.state.gateway ? location.state.url : BASE_URL);
    }
  }, []);

  return (
    <>
      <HeaderCard serviceData={props.serviceData} />
      <ServiceTab serviceData={props.serviceData} serviceUrl={serviceUrl} />
    </>
  );
};

export default connect(({ service }: ConnectState) => ({
  serviceData: service.serviceData,
}))(ServiceDetail);
