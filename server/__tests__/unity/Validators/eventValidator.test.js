/* eslint-disable no-undef */
// import request from 'supertest';
import EventValidator from '../../../src/app/Validators/EventValidator';

import factory from '../../factories';

describe('EventsValidator', () => {
  // CreateValidator
  // Name
  it('should have name when create a event', async () => {
    const event = await factory.attrs('Event', {
      name: undefined,
    });
    await expect(EventValidator.createValidator(event)).rejects.toThrow(
      /name is a required field./
    );
  });

  it('should have name trim when create a event', async () => {
    const event = await factory.attrs('Event', {
      name: ' name ',
    });
    const Event = await EventValidator.createValidator(event);
    expect(Event.name).toBe('name');
  });

  // duration
  it('should have duration trim when create a event', async () => {
    const event = await factory.attrs('Event', {
      duration: undefined,
    });
    const Event = await EventValidator.createValidator(event);
    expect(Event.duration).toBe(30);
  });

  it('duration must be a `number` type when create a event', async () => {
    const event = await factory.attrs('Event', {
      duration: 'test',
    });
    await expect(EventValidator.createValidator(event)).rejects.toThrow(
      /duration must be a `number` type/
    );
  });

  it('duration must be greater than or equal to 0 when create a event', async () => {
    const event = await factory.attrs('Event', {
      duration: -1,
    });
    await expect(EventValidator.createValidator(event)).rejects.toThrow(
      /duration must be greater than or equal to 0/
    );
  });

  // repeatable
  it('should have duration repeatable create a event', async () => {
    const event = await factory.attrs('Event', {
      repeatable: undefined,
    });
    const Event = await EventValidator.createValidator(event);
    expect(Event.repeatable).toBe('not');
  });

  it('repeatable must be one of the following values: daily, weekly, not when create a event', async () => {
    const event = await factory.attrs('Event', {
      repeatable: 'test',
    });
    await expect(EventValidator.createValidator(event)).rejects.toThrow(
      /repeatable must be one of the following values: daily, weekly, not/
    );
  });

  // eventMeals
  it('should be eventMeals Array when create a event', async () => {
    const event = await factory.attrs('Event', {
      eventMeals: 'test',
    });
    await expect(EventValidator.createValidator(event)).rejects.toThrow(
      /eventMeals must be a `array` type/
    );
  });

  // EventMeal/mealId
  it('should be eventMeals[0].mealId is a required field when create a event', async () => {
    const event = await factory.attrs('Event', {
      eventMeals: [factory.attrs('EventMeal', { mealId: undefined })],
    });
    await expect(EventValidator.createValidator(event)).rejects.toThrow(
      /mealId is a required field/
    );
  });

  it('eventMeals[0].mealId must be a `number` type when create a event', async () => {
    const event = await factory.attrs('Event', {
      eventMeals: [factory.attrs('EventMeal', { mealId: 'test' })],
    });
    await expect(EventValidator.createValidator(event)).rejects.toThrow(
      /mealId must be a `number` type/
    );
  });

  it('eventMeals[0].mealId must be an integer when create a event', async () => {
    const event = await factory.attrs('Event', {
      eventMeals: [factory.attrs('EventMeal', { mealId: 1.5 })],
    });
    await expect(EventValidator.createValidator(event)).rejects.toThrow(
      /mealId must be an integer/
    );
  });

  it('eventMeals[0].mealId must be greater than or equal to 0 when create a event', async () => {
    const event = await factory.attrs('Event', {
      eventMeals: [factory.attrs('EventMeal', { mealId: -1 })],
    });
    await expect(EventValidator.createValidator(event)).rejects.toThrow(
      /mealId must be greater than or equal to 0/
    );
  });
  // EventMeal/Amount

  it('eventMeals[0].amount must be a `number` type when create a event', async () => {
    const event = await factory.attrs('Event', {
      eventMeals: [factory.attrs('EventMeal', { amount: 'test' })],
    });
    await expect(EventValidator.createValidator(event)).rejects.toThrow(
      /amount must be a `number` type/
    );
  });

  it('eventMeals[0].amount must be greater than or equal to 0 when create a event', async () => {
    const event = await factory.attrs('Event', {
      eventMeals: [factory.attrs('EventMeal', { amount: -1 })],
    });
    await expect(EventValidator.createValidator(event)).rejects.toThrow(
      /amount must be greater than or equal to 0/
    );
  });
  // updateValidator
  // Name

  it('should have name trim when update a event', async () => {
    const event = await factory.attrs('Event', {
      name: ' name ',
    });
    const Event = await EventValidator.createValidator(event);
    expect(Event.name).toBe('name');
  });

  // eventMeals
  it('should be eventMeals Array when update a event', async () => {
    const event = await factory.attrs('Event', {
      eventMeals: 'test',
    });
    await expect(EventValidator.updateValidator(event)).rejects.toThrow(
      /eventMeals must be a `array` type/
    );
  });

  // duration
  it('duration must be a `number` type when update a event', async () => {
    const event = await factory.attrs('Event', {
      duration: 'test',
    });
    await expect(EventValidator.updateValidator(event)).rejects.toThrow(
      /duration must be a `number` type/
    );
  });

  it('duration must be greater than or equal to 0 when update a event', async () => {
    const event = await factory.attrs('Event', {
      duration: -1,
    });
    await expect(EventValidator.updateValidator(event)).rejects.toThrow(
      /duration must be greater than or equal to 0/
    );
  });

  // EventMeal/mealId
  it('should be eventMeals[0].mealId is a required field when update a event', async () => {
    const event = await factory.attrs('Event', {
      eventMeals: [factory.attrs('EventMeal', { mealId: undefined })],
    });
    await expect(EventValidator.updateValidator(event)).rejects.toThrow(
      /mealId is a required field/
    );
  });

  it('eventMeals[0].mealId must be a `number` type when update a event', async () => {
    const event = await factory.attrs('Event', {
      eventMeals: [factory.attrs('EventMeal', { mealId: 'test' })],
    });
    await expect(EventValidator.updateValidator(event)).rejects.toThrow(
      /mealId must be a `number` type/
    );
  });

  it('eventMeals[0].mealId must be an integer when update a event', async () => {
    const event = await factory.attrs('Event', {
      eventMeals: [factory.attrs('EventMeal', { mealId: 1.5 })],
    });
    await expect(EventValidator.updateValidator(event)).rejects.toThrow(
      /mealId must be an integer/
    );
  });

  it('eventMeals[0].mealId must be greater than or equal to 0 when update a event', async () => {
    const event = await factory.attrs('Event', {
      eventMeals: [factory.attrs('EventMeal', { mealId: -1 })],
    });
    await expect(EventValidator.updateValidator(event)).rejects.toThrow(
      /mealId must be greater than or equal to 0/
    );
  });
  // EventMeal/Amount

  it('eventMeals[0].amount must be a `number` type when update a event', async () => {
    const event = await factory.attrs('Event', {
      eventMeals: [factory.attrs('EventMeal', { amount: 'test' })],
    });
    await expect(EventValidator.updateValidator(event)).rejects.toThrow(
      /amount must be a `number` type/
    );
  });

  it('eventMeals[0].amount must be greater than or equal to 0 when update a event', async () => {
    const event = await factory.attrs('Event', {
      eventMeals: [factory.attrs('EventMeal', { amount: -1 })],
    });
    await expect(EventValidator.updateValidator(event)).rejects.toThrow(
      /amount must be greater than or equal to 0/
    );
  });
});
