import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import Stripe from 'stripe';
import { CreateChargeDto } from '@app/common';

@Injectable()
export class PaymentsService {
  private readonly stripe = new Stripe(
    this.configService.get('STRIPE_SECRET_KEY'),
    {
      apiVersion: '2023-10-16',
    },
  );
  constructor(private readonly configService: ConfigService) {}
  async createCharge(data: CreateChargeDto) {
    const { amount } = data;
    const paymentIntent = await this.stripe.paymentIntents.create({
      amount: amount * 100,
      currency: 'usd',
      automatic_payment_methods: {
        enabled: true,
      },
    });
    return paymentIntent;
  }
}
