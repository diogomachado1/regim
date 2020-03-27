import tracer from 'dd-trace';

tracer.init({
  analytics: true,
});

tracer.use('express', {
  analytics: true,
});

tracer.use('postgress', {
  analytics: true,
});

export default tracer;
