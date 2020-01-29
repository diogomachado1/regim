import React, { useState, useCallback, useEffect, useMemo } from 'react';
import {
  MdAddCircleOutline,
  MdArrowBack,
  MdArrowForward,
} from 'react-icons/md';
import { Link } from 'react-router-dom';
import { ptBR } from 'date-fns/locale';

import { useDispatch, useSelector } from 'react-redux';
import {
  startOfDay,
  addWeeks,
  isSameDay,
  parseISO,
  format,
  isPast,
} from 'date-fns';
import { addMinutes } from 'date-fns/esm';
import { Container, EventsList, EventItem, Pagination } from './styles';
import { Button } from '~/components/Button';
import { PagButton } from '~/components/Button/styles';

import Loading from '~/components/Loading';
import {
  getEventRequest,
  deleteEventRequest,
} from '~/store/modules/event/actions';

export default function Event() {
  const dispatch = useDispatch();
  const [weekShow, setWeekShow] = useState(0);

  const events = useSelector(state => state.event.events);
  const loading = useSelector(state => state.event.loading);

  const startWeek = useMemo(() => addWeeks(startOfDay(new Date()), weekShow), [
    weekShow,
  ]);
  const endWeek = useMemo(() => addWeeks(startWeek, 1), [startWeek]);

  const loadEvents = useCallback(async () => {
    dispatch(getEventRequest(startWeek, endWeek));
  }, [dispatch, endWeek, startWeek]);

  useEffect(() => {
    loadEvents();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [loadEvents]);

  function nextWeek() {
    setWeekShow(weekShow + 1);
  }

  function lastWeek() {
    setWeekShow(weekShow - 1);
  }

  const FormatedEvent = useMemo(() => {
    return events.reduce((formatEvents, current) => {
      let pos;
      formatEvents.find((item, index) => {
        if (
          isSameDay(
            parseISO(item[0].eventStartDate),
            parseISO(current.eventStartDate)
          )
        ) {
          pos = index;
          return true;
        }
        return false;
      });

      if (pos >= 0) {
        formatEvents[pos].push(current);
        return formatEvents;
      }
      return [...formatEvents, [current]];
    }, []);
  }, [events]);

  async function handleRemoveEvent(id) {
    dispatch(deleteEventRequest({ id }));
  }

  function getFinishDate(date, duration) {
    return format(addMinutes(parseISO(date), duration), 'HH:mm', {
      locale: ptBR,
    });
  }

  return (
    <>
      <Container>
        <Pagination>
          <PagButton onClick={() => lastWeek()}>
            <MdArrowBack size="14" />
          </PagButton>
          <span>
            {`${format(startWeek, 'dd/MM')}-${format(endWeek, 'dd/MM')}`}
          </span>
          <PagButton onClick={() => nextWeek()}>
            <MdArrowForward size="14" />
          </PagButton>
        </Pagination>
        <Link to="/events/create">
          <Button color="success" onClick={() => {}}>
            <MdAddCircleOutline size="24" />
            Add
          </Button>
        </Link>
        <EventsList>
          {FormatedEvent.map(day => (
            <div key={day[0].eventStartDate}>
              <span>
                {format(parseISO(day[0].eventStartDate), 'EEEE (dd/MM)', {
                  locale: ptBR,
                }).toUpperCase()}
              </span>
              {day.map(event => (
                <EventItem
                  lasted={isPast(parseISO(event.eventStartDate))}
                  key={event.eventStartDate}
                >
                  <div>
                    <span>
                      {`${event.event.name} (${format(
                        parseISO(event.eventStartDate),
                        'HH:mm',
                        {
                          locale: ptBR,
                        }
                      )}-${getFinishDate(
                        event.eventStartDate,
                        event.event.duration
                      )})`}
                    </span>
                    <Link to={`/events/${event.event.id}`}>
                      <Button color="warning" onClick={() => {}}>
                        Editar
                      </Button>
                    </Link>
                    <Button
                      onClick={() => handleRemoveEvent(event.event.id)}
                      color="danger"
                    >
                      remover
                    </Button>
                  </div>
                </EventItem>
              ))}
            </div>
          ))}
        </EventsList>
      </Container>
      {loading && <Loading />}
    </>
  );
}
