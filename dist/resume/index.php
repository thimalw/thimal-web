<?php
header('Content-type: application/pdf');
header('Content-Disposition: inline; filename="Thimal Wickremage - Resume.pdf"');
readfile('resume.pdf');