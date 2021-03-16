import React from "react";
import styled from "styled-components";

export default function Loading() {
  return (
    <LoadingWrapper>
      <div className="load-page">
        <div className="loader">
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <div>
                        <div></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </LoadingWrapper>
  );
}

const LoadingWrapper = styled.div`
  .load-page {
    background: #fff;
    overflow: hidden;
  }

  .loader {
    width: 300px;
    height: 300px;
    margin: auto;
  }
  .loader div {
    width: calc(100% - 15px);
    height: calc(100% - 15px);
    border: 2px solid #fff;
    border-top: 2px solid crimson;
    border-radius: 50%;
    animation: rotate 10s linear infinite alternate-reverse;
  }
  @keyframes rotate {
    50% {
      transform: rotate(80deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;
