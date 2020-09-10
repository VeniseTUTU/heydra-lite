export default (code,firstname) => {
  return `<section style="width: 90%; margin: 0 auto;padding: 15px 10px;background-color:#eeecec;">   
  <div style="width: 100%; background-color:#fff; padding: 15px 0;margin-bottom: 10px;font-family:Arial;font-size: 12px;">
  <div style="width: 75px; height: 50px; margin: 0 auto">
    <img src="https://www.sjinet.com/src/images/sjinet_official_logo.png" alt="sjinet_logo" style="width:100%;height:100%"/>
  </div>
  </div>

  <div style="width: 100%; background-color:#fff; padding: 15px 0;margin-bottom: 10px;font-family:Arial;font-size: 12px;">
    
   
  <div style="padding:20px;color: #5f5f5f;font-weight:bold;font-size: 15px;">
    ${code}
  </div>
  <div style="color: #5f5f5f;padding: 0 20px 20px 20px;line-height: 20px;">
      Dear ${firstname}<br/><br/>
    You recently requested to reset your account password for "sjinet.com".
    Enter the above code into the "Security Code" field in your browser to complete the password reset. <br/><br/>
    <strong>Note:</strong> For your protection, if you did not initiate this request, contact support.
     
    <div style="color: #8c8c8c;line-height: 25px;margin-top: 20px;border-top:2px solid #999999; padding-top: 10px;">
    Do not reply to this automated message. 
    </div>  
   </div>
</section>`

};