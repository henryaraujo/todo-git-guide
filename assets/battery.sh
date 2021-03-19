#!/bin/bash

doubleDigit=$(acpi | grep '[0-9][0-9]%' | awk 'NR==1{print $4}' | cut -c 1-3)

if [ ${#doubleDigit} -gt 1 ]; then
	echo "$doubleDigit"
else
	doubleDigit=$(acpi | grep '[0-9]%' | awk 'NR==1{print $4}' | cut -c 1-2)
	echo "$doubleDigit"
fi

