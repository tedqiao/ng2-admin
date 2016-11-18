
import google from './auth.google';
import facebook from './auth.facebook';

var auths = {
  google:google,
  facebook:facebook
}


export default function(req,res,done){
    auths[req.params.social](req,res,done);
};
