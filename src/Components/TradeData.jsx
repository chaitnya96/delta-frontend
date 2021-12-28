import React from "react";
import PropTypes from "prop-types";
import MarkPriceUpdate from "./MarkPriceUpdate";
import "./table.css";
export default function TradeData({ data, markPrice }) {
  return (
    <table className="table table-responsive">
      <thead>
        <tr>
          <th scope="col">Symbol</th>
          <th scope="col">Description</th>
          <th scope="col">Underlying Asset</th>
          <th scope="col">Mark Price</th>
        </tr>
      </thead>
      <tbody>
        {data.map(
          (
            {
              id,
              symbol,
              description,
              underlying_asset,
              mark_price: markPrice,
            },
            index
          ) => (
            <tr key={id}>
              <th>{symbol}</th>
              <td>{description}</td>
              <td>{underlying_asset.symbol}</td>
              <MarkPriceUpdate markPrice={markPrice} />
            </tr>
          )
        )}
      </tbody>
    </table>
  );
}

TradeData.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      symbol: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      underlying_asset: PropTypes.object.isRequired,
    })
  ),
  markPrice: PropTypes.object.isRequired,
};

TradeData.defaultProps = {
  data: [],
  markPrice: {},
};
