import tracer from 'dd-trace';

tracer.init({
  analytics: true,
});

tracer.use('express', {
  analytics: true,
});

tracer.use('pg', {
  service: 'pg-cluster',
});

export default tracer;
