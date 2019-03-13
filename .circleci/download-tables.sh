if [ ! -d tables ]; then
  wget http://iai.group/downloads/smart_table/WP_tables.zip
  unzip -j -d tables WP_tables.zip 'tables_redi2_1/*'
  rm WP_tables.zip
fi
