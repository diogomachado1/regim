import { QueryTypes } from 'sequelize';
import { addMonths, format, parseISO } from 'date-fns';
import database from '../../database';

class ListController {
  async index(req, res) {
    const { userId: user_id } = req;
    const { fromDate, toDate } = req.query;
    const fromDateQuery = format(
      fromDate ? parseISO(fromDate) : new Date(),
      'yyyy-MM-dd HH:mm:ss'
    );
    const toDateQuery = format(
      toDate ? parseISO(toDate) : addMonths(new Date(), 1),
      'yyyy-MM-dd HH:mm:ss'
    );
    const ProductList = await database.connection.query(
      `SELECT SUM("event->eventMeals"."amount" * "event->eventMeals->meals->ingredients"."amount") AS "amountTotal",
      "event->eventMeals->meals->ingredients->products"."price" AS "event.eventMeals.meals.ingredients.products.price",
      SUM("event->eventMeals"."amount" * "event->eventMeals->meals->ingredients"."amount" * ("event->eventMeals->meals->ingredients->products"."price"/"event->eventMeals->meals->ingredients->products"."amount") ) AS "totalPrice",
      "event->eventMeals->meals->ingredients"."product_id" AS "event.eventMeals.meals.ingredients.productId",
      "event->eventMeals->meals->ingredients->products"."name" AS "event.eventMeals.meals.ingredients.products.name"
      FROM "single_events" AS "SingleEvent"
      INNER JOIN "events" AS "event" ON "SingleEvent"."event_id" = "event"."id" AND "event"."user_id" = $user_id AND "SingleEvent".event_start_date >= $fromDateQuery AND "SingleEvent".event_start_date <= $toDateQuery
      LEFT OUTER JOIN "event_meals" AS "event->eventMeals" ON "event"."id" = "event->eventMeals"."event_id"
      LEFT OUTER JOIN "meals" AS "event->eventMeals->meals" ON "event->eventMeals"."meal_id" = "event->eventMeals->meals"."id"
      LEFT OUTER JOIN "ingredients" AS "event->eventMeals->meals->ingredients" ON "event->eventMeals->meals"."id" = "event->eventMeals->meals->ingredients"."meal_id"
      LEFT OUTER JOIN "products" AS "event->eventMeals->meals->ingredients->products" ON "event->eventMeals->meals->ingredients"."product_id" = "event->eventMeals->meals->ingredients->products"."id"
      GROUP BY "event->eventMeals->meals->ingredients"."product_id", "event->eventMeals->meals->ingredients->products"."price","event->eventMeals->meals->ingredients->products"."name"
      `,
      {
        bind: { user_id, fromDateQuery, toDateQuery },
        type: QueryTypes.SELECT,
      }
    );

    return res.status(200).json(ProductList);
  }
}

export default new ListController();
