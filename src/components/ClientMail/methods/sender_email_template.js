export default (replyTo,firstname) => {
  return `<section style="width: 90%; margin: 0 auto;padding: 15px 10px;background-color:#eeecec;">   
  <div style="width: 100%; background-color:#fff; padding: 15px 0;margin-bottom: 10px;font-family:Arial;font-size: 12px;">
    
  
  <div style="color: #5f5f5f;padding: 0 20px 20px 20px;line-height: 20px;">
    Hello ${firstname}<br/><br/>
		This is a notification email acknowledging that we have recieved your 
		message and will reach out to you within 24 hours. <br/><br/>
		If you did not get a response from us within this time, please allow 
    for up to 3 days after which you can resend the request mail again using the 
    contact form on our website or send a mail to ${replyTo}<br/><br/>
    <strong>Note:</strong> You got this mail because you contacted us via our 
     website. If you did not initiate this request, Please disregard this mail.
     
    <div style="color: #8c8c8c;line-height: 25px;margin-top: 20px;border-top:2px solid #999999; padding-top: 10px;">
    Do not reply to this automated message. 
    </div>  
   </div>
</section>`

};