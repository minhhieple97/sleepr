import { ConfigService } from '@nestjs/config';
import { Inject, Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CreateChargeDto, NOTIFICATIONS_SERVICE } from '@app/common';
import { ClientProxy } from '@nestjs/microservices';
import { PaymentCreateChargeDto } from '../dto';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-10-16',
    },
  );
  constructor(
    private readonly configService: ConfigService,
    @Inject(NOTIFICATIONS_SERVICE)
    private readonly notificationsService: ClientProxy,
  ) {}
  async createCharge(data: PaymentCreateChargeDto) {
    const { amount, email } = data;
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    this.notificationsService.emit('notify_email', {
      email,
    });
    return paymentIntent;
  }
}
