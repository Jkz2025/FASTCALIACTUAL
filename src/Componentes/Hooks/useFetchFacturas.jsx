import React from 'react'
import { useState } from 'react';
import { useEffect } from 'react';
import fetchFacturas from '../Function/fetchFacturas';

export const useFetchFacturas = (setFacturas) => {
    useEffect(() => {
        async function loadFacturas() {
          try {
            const data = await fetchFacturas();
            setFacturas(data);
          } catch (error) {}
        }
        loadFacturas()   
      },  []);
    }

