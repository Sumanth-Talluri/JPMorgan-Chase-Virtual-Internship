import React, { Component } from 'react';
import { Table } from '@jpmorganchase/perspective';
import { ServerRespond } from './DataStreamer';
import { DataManipulator } from './DataManipulator';
import './Graph.css';

interface IProps {
	data: ServerRespond[];
}

interface PerspectiveViewerElement extends HTMLElement {
	load: (table: Table) => void;
}
class Graph extends Component<IProps, {}> {
	table: Table | undefined;

	render() {
		return React.createElement('perspective-viewer');
	}
	// the componentDidMount() method runs after the component output has been rendered to the DOM
	componentDidMount() {
		// Get element from the DOM.
		const elem = (document.getElementsByTagName('perspective-viewer')[0] as unknown) as PerspectiveViewerElement;

		const schema = {
			// to get the ratio we add the below 2 fields
			price_abc: 'float',
			price_def: 'float',
			// since we want to track the ratios we have a ratio field
			ratio: 'float',
			// to track all of this with respect to time we have timestamp
			timestamp: 'date',
			// the bounds are tracked using the below 2 fields
			upper_bound: 'float',
			lower_bound: 'float',
			// to check when the bounds are crossed we added this alert
			trigger_alert: 'float'
		};

		if (window.perspective && window.perspective.worker()) {
			this.table = window.perspective.worker().table(schema);
		}
		if (this.table) {
			// Load the `table` in the `<perspective-viewer>` DOM reference.
			elem.load(this.table);
			elem.setAttribute('view', 'y_line');
			elem.setAttribute('row-pivots', '["timestamp"]');
			elem.setAttribute('columns', '["ratio", "lower_bound", "upper_bound", "trigger_alert"]');
			// aggregates will allow us to handle the cases of duplicated data and consolidate them as just one data point
			elem.setAttribute(
				'aggregates',
				JSON.stringify({
					price_abc: 'avg',
					price_def: 'avg',
					ratio: 'avg',
					timestamp: 'distinct count',
					upper_bound: 'avg',
					lower_bound: 'avg',
					trigger_alert: 'avg'
				})
			);
		}
	}

	// This method gets executed whenever the component updates
	componentDidUpdate() {
		if (this.table) {
			this.table.update([ DataManipulator.generateRow(this.props.data) ]);
		}
	}
}

export default Graph;
