<?php
session_start();
session_id("quiz");
session_write_close();
echo "Hello";