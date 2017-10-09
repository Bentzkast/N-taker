if(process.env.NODE_ENV === 'production'){
  module.exports = {
    mongoURI:
    'mongodb://Bentzkast:KW75dw78@@ds013475.mlab.com:13475/n-taker'};
} else{
  module.exports = {
    mongoURI:
    'mongodb://localhost/n-taker-dev'
  };
}
