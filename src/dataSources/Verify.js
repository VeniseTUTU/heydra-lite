import { DataSource } from 'apollo-datasource';

export default class Verify extends DataSource {
  constructor({ methods }) {
    super();
    this.methods = methods;
    
  }

  initialize(config) {
    this.context = config.context; 
  }

  async getBillingStatus(){ 
    
    const userId =  await this.context.req.headers.userid;
    userId = +userId;
    const billing = await this.context.prisma.billing.findOne({
      where:{ userId }
    });
    if(!billing) throw new Error('No billing record found.');
    if (billing.status != "active") return false;
    return true;
  };
    
}
