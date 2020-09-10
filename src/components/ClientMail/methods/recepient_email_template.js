export default (email,firstname,message) => {
  return `<section style="width: 90%; margin: 0 auto;padding: 15px 10px;background-color:#eeecec;">   
  <div style="width: 100%; background-color:#fff; padding: 15px 0;margin-bottom: 10px;font-family:Arial;font-size: 12px;">
    
  
  <div style="color: #5f5f5f;padding: 0 20px 20px 20px;line-height: 20px;">
    
    An inquest with ${email} was made through the web platform: <br/><br/>
    Name: ${firstname} <br/><br/>
    Mesage: ${message} <br/><br/>
		Please reply to ${firstname} via ${email} as soon as possible.<br/><br/>
    
    <div style="color: #8c8c8c;line-height: 25px;margin-top: 20px;border-top:2px solid #999999; padding-top: 10px;">
    Do not reply to this automated message. 
    </div>  
   </div>
</section>`

};