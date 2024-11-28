// src/components/KanbanBoard.js
import React, { useEffect, useState } from 'react';
import { fetchData } from '../api';
import './KanbanBoard.css';
import TicketCard from './TicketCard';

const priorityLabels = {
  4: 'Urgent',
  3: 'High',
  2: 'Medium',
  1: 'Low',
  0: 'No priority',
};

const KanbanBoard = () => {
  const [tickets, setTickets] = useState([]);
  const [viewState, setViewState] = useState('status'); // default grouping
  const [sortOrder, setSortOrder] = useState('priority'); // default sorting

  const groupAndSortTickets = (data) => {
    switch (data.viewState) {
      case 'status':
        return groupAndSortByStatus(data);
      case 'user':
        return groupAndSortByUser(data);
      case 'priority':
        return groupAndSortByPriority(data);
      default:
        return data.tickets; // Return original data if viewState is not recognized
    }
  };

  const groupAndSortByStatus = (data) => {
    // Implement grouping and sorting by status
    const groupedTickets = {};
    data.tickets.forEach((ticket) => {
      const status = ticket.status;
      if (!groupedTickets[status]) {
        groupedTickets[status] = [];
      }
      groupedTickets[status].push(ticket);
    });

    const sortedTickets = sortTickets(groupedTickets);
    return sortedTickets;
  };

  const groupAndSortByUser = (data) => {
    // Implement grouping and sorting by user
    const groupedTickets = {};
    data.tickets.forEach((ticket) => {
      const user = ticket.user;
      if (!groupedTickets[user]) {
        groupedTickets[user] = [];
      }
      groupedTickets[user].push(ticket);
    });

    const sortedTickets = sortTickets(groupedTickets);
    return sortedTickets;
  };

  const groupAndSortByPriority = (data) => {
    // Implement grouping and sorting by priority
    const groupedTickets = {};
    data.tickets.forEach((ticket) => {
      const priority = ticket.priority;
      if (!groupedTickets[priority]) {
        groupedTickets[priority] = [];
      }
      groupedTickets[priority].push(ticket);
    });

    const sortedTickets = sortTickets(groupedTickets);
    return sortedTickets;
  };

  const sortTickets = (groupedTickets) => {
    let sortedTickets = [];
    Object.keys(groupedTickets).forEach((key) => {
      const group = groupedTickets[key];
      if (sortOrder === 'priority') {
        group.sort((a, b) => b.priority - a.priority);
      } else if (sortOrder === 'title') {
        group.sort((a, b) => a.title.localeCompare(b.title));
      }
      sortedTickets = sortedTickets.concat(group);
    });
    return sortedTickets;
  };

  useEffect(() => {
    const fetchDataAndSetState = async () => {
      try {
        const data = await fetchData();
        setTickets(data.tickets);
      } catch (error) {
        // Handle error
      }
    };

    fetchDataAndSetState();
  }, []);

  useEffect(() => {
    const savedViewState = localStorage.getItem('viewState');
    if (savedViewState) {
      setViewState(savedViewState);
    }
  }, []);

  useEffect(() => {
    const groupedAndSortedTickets = groupAndSortTickets({ tickets, viewState, sortOrder });
    setTickets(groupedAndSortedTickets);
    localStorage.setItem('viewState', viewState);
  }, [viewState, sortOrder]);

  const renderKanbanBoard = () => {
    const columns = {};
    const sortedTickets = [...tickets];

    const groupedTickets = groupAndSortTickets({ tickets, viewState, sortOrder });
    sortedTickets.forEach((ticket) => {
      const groupKey = viewState === 'priority' ? priorityLabels[ticket.priority] : ticket[viewState];

      if (!columns[groupKey]) {
        columns[groupKey] = [];
      }

      columns[groupKey].push(<TicketCard key={ticket.id} ticket={ticket} />);
    });

    return (
      <div className="kanban-board">
        {Object.keys(columns).map((columnKey) => (
          <div key={columnKey} className="column">
            <h2> {viewState === 'priority' ? `${columnKey}` : columnKey} {columns[columnKey].length}
            </h2>
            {columns[columnKey]}
          </div>
        ))}
      </div>
    );
  };

  return (
    <div>
      <div className='displayFilterDropdown'>
        <label className='dropdownElementContainer'>
          Grouping
          <select
            value={viewState}
            onChange={(e) => setViewState(e.target.value)}>
            <option value='status'>By Status</option>
            <option value='user'>By User</option>
            <option value='priority'>By Priority</option>
          </select>
        </label>

        <label className='dropdownElementContainer'>
          Ordering
          <select
            value={sortOrder}
            onChange={(e) => setSortOrder(e.target.value)}>
            <option value='priority'>Priority</option>
            <option value='title'>Title</option>
          </select>
        </label>
      </div>
      {renderKanbanBoard()}
    </div>
  );
};

export default KanbanBoard;
