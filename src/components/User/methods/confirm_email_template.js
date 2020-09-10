export default (date,firstname,url) => {
  return `<section style="width: 90%; margin: 0 auto;padding: 15px 10px;background-color:#eeecec;">   
  <div style="width: 100%; background-color:#fff; padding: 15px 0;margin-bottom: 10px;font-family:Arial;font-size: 12px;">
  <div style="width: 75px; height: 50px; margin: 0 auto">
    <img src="https://www.sjinet.com/src/images/sjinet_official_logo.png" alt="sjinet_logo" style="width:100%;height:100%"/>
  </div>
  </div>

  <div style="width: 100%; background-color:#fff; padding: 15px 0;margin-bottom: 10px;font-family:Arial;font-size: 12px;">
    
   
  <div style="padding:20px;color: #5f5f5f;font-weight:bold;font-size: 11px;">
    ${date}
  </div>
  <div style="color: #5f5f5f;padding: 0 20px 20px 20px;line-height: 20px;">
			Dear ${firstname}
			<br/><br/>
			Thank you for signing up on www.sjinet.com. We hope you will enjoy your
			streaming experience on the platform.
			<br/><br/>

			Please, take a second to make sure we've got your email right.
			<br/><br/>
     <a href="${url}" style="text-decoration:none;">
			<div style="width: 120px;text-align:center;margin: 0 auto;background-color:#bb1e1e; color: #fff; padding: 8px 10px; border-radius:3px;cursor:pointer;">
				Confirm you email
			</div>
     </a>
			<br/><br/>
			<strong>Note:</strong> Didn't sign up for Sjinet.com? Let us know.
			 
			<div style="color: #8c8c8c;line-height: 25px;margin-top: 20px;border-top:2px solid #999999; padding-top: 10px;">
			Do not reply to this automated message. 
			</div>  
		 </div>
	</section>`

};